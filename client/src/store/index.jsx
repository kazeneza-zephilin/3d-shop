import { proxy } from "valtio";

const state = proxy({
    intro:true,
    color: "#828D9C",
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: "./3d-shop-new.png",
    fullDecal: "./floral-pattern.png",
});

export default state;