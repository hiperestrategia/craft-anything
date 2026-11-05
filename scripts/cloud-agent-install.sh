#!/usr/bin/env bash
# Idempotent setup for a Craft Anything Cloud Agent.
# Installs Rust 1.97+ (stable), the packages the CLI needs to compile, and
# craft-anything-cli on PATH. Safe to run again: a second run skips work that
# is already current for this checkout.
#
# Run from the repository root:
#   bash scripts/cloud-agent-install.sh
set -euo pipefail

export PATH="/usr/local/cargo/bin:/usr/local/bin:${HOME}/.cargo/bin:${PATH:-/usr/bin:/bin}"

if ! command -v sudo >/dev/null 2>&1; then
  echo "sudo is required to install packages and to place craft-anything-cli on PATH." >&2
  exit 1
fi

if ! command -v rustup >/dev/null 2>&1; then
  curl --proto '=https' --tlsv1.2 -fsSL https://sh.rustup.rs \
    | sh -s -- -y --default-toolchain stable --profile minimal --no-modify-path
  export PATH="${HOME}/.cargo/bin:${PATH}"
fi

min_rust="1.97.0"
if ! command -v rustc >/dev/null 2>&1; then
  rustup toolchain install stable --profile minimal
  rustup default stable
else
  current="$(rustc --version | awk '{print $2}')"
  oldest="$(printf '%s\n%s\n' "$min_rust" "$current" | sort -V | head -n 1)"
  if [ "$oldest" != "$min_rust" ]; then
    rustup toolchain install stable --profile minimal
    rustup default stable
  fi
fi

# Login shells do not load ~/.bashrc. Symlink the toolchain onto the default PATH.
for tool in rustup rustc cargo; do
  src="$(command -v "$tool" || true)"
  if [ -n "${src}" ] && [ "${src}" != "/usr/local/bin/${tool}" ]; then
    sudo ln -sfn "${src}" "/usr/local/bin/${tool}"
  fi
done

sudo DEBIAN_FRONTEND=noninteractive apt-get update -qq
sudo DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
  build-essential \
  pkg-config \
  ca-certificates \
  curl

if [ ! -f apps/craft-anything-cli/Cargo.toml ]; then
  echo "apps/craft-anything-cli/Cargo.toml was not found. Run this from the repository root." >&2
  exit 1
fi

stamp_dir="/usr/local/share/craft-anything"
stamp_file="${stamp_dir}/cli.stamp"
src_stamp="$(git rev-parse HEAD 2>/dev/null || echo nogit)"
installed_stamp=""
if [ -f "${stamp_file}" ]; then
  installed_stamp="$(cat "${stamp_file}")"
fi

if [ ! -x /usr/local/bin/craft-anything-cli ] || [ "${installed_stamp}" != "${src_stamp}" ]; then
  export CARGO_BUILD_JOBS="${CARGO_BUILD_JOBS:-1}"
  export CARGO_TARGET_DIR="${CARGO_TARGET_DIR:-${HOME}/.cache/craft-anything/target}"
  mkdir -p "${CARGO_TARGET_DIR}"
  cargo install --path apps/craft-anything-cli --locked --force --root "${HOME}/.local/craft-anything-cli"
  sudo install -m 0755 "${HOME}/.local/craft-anything-cli/bin/craft-anything-cli" /usr/local/bin/craft-anything-cli
  sudo mkdir -p "${stamp_dir}"
  printf '%s\n' "${src_stamp}" | sudo tee "${stamp_file}" >/dev/null
else
  echo "craft-anything-cli already matches this checkout (${src_stamp}); skipping the compile."
fi

exec craft-anything-cli doctor
