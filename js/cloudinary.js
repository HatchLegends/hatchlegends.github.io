(function (global) {
  const CONFIG = {
    cloudName: "djji1l7ti",
    defaultTransforms: "f_auto,q_auto"
  };

  function hasCloudName() {
    return CONFIG.cloudName && !CONFIG.cloudName.startsWith("REPLACE_WITH_");
  }

  function normalizePart(value) {
    return String(value || "")
      .trim()
      .replace(/^\/+|\/+$/g, "");
  }

  function buildPublicId(folder, assetId) {
    return normalizePart(assetId);
  }

  function urlFor(folder, assetId, transforms = CONFIG.defaultTransforms) {
    if (!hasCloudName() || !assetId) return "";

    const publicId = buildPublicId(folder, assetId);

    return `https://res.cloudinary.com/${CONFIG.cloudName}/image/upload/${transforms}/${publicId}`;
  }
  
  function apply(root = document) {
    if (!hasCloudName()) return;

    root.querySelectorAll("[data-cld-id]").forEach((element) => {
      const assetId = element.dataset.cldId;
      const folder = element.dataset.cldFolder || "";
      const transforms = element.dataset.cldTransforms || CONFIG.defaultTransforms;
      const cloudinaryUrl = urlFor(folder, assetId, transforms);

      if (!cloudinaryUrl) return;

      if (element.tagName === "IMG") {
        element.src = cloudinaryUrl;
      }
    });
  }

  global.HL_CLOUDINARY = {
    config: CONFIG,
    hasCloudName,
    urlFor,
    uiElement(assetId, transforms) {
      return urlFor("ui_elements", assetId, transforms);
    },
    egg(assetId, transforms) {
      return urlFor("eggs", assetId, transforms);
    },
    essence(assetId, transforms) {
      return urlFor("essence", assetId, transforms);
    },
    creature(assetId, transforms) {
      return urlFor("creatures", assetId, transforms);
    },
    creatureShiny(assetId, transforms) {
      return urlFor("creatures/creatures_shiny", assetId, transforms);
    },
    apply
  };
})(window);
