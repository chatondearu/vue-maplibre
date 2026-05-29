{
  description = "vue-maplibre development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    systems.url = "github:nix-systems/default";
    flake-utils = {
      url = "github:numtide/flake-utils";
      inputs.systems.follows = "systems";
    };
  };

  outputs = { nixpkgs, flake-utils, ... }:
    let
      nodeVersion = "22.22.3";
      pnpmVersion = "11.5.0";
    in
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            nodejs_22
            pnpm
          ];

          shellHook = ''
            export PNPM_HOME="$PWD/.pnpm-home"
            export PATH="$PNPM_HOME:$PATH"
            export COREPACK_HOME="$PWD/.corepack"
            mkdir -p "$PNPM_HOME" "$COREPACK_HOME"
            corepack enable >/dev/null 2>&1
            corepack prepare pnpm@${pnpmVersion} --activate >/dev/null 2>&1
            cat > "$PNPM_HOME/pnpm" <<'EOF'
#!/usr/bin/env bash
exec corepack pnpm "$@"
EOF
            chmod +x "$PNPM_HOME/pnpm"
            echo "[nix develop] node=${nodeVersion} pnpm=${pnpmVersion}"
          '';
        };
      }
    );
}
