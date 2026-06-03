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
            # Prefer nixpkgs pnpm over a project-local corepack shim (avoids worker install failures).
            export PATH="${pkgs.pnpm}/bin:${pkgs.nodejs_22}/bin:$PATH"
            echo "[nix develop] node=${nodeVersion} pnpm=$(pnpm --version)"
          '';
        };
      }
    );
}
