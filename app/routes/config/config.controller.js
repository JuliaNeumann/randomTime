const Config = require("../../services/config");

/**
 * Main Route Contoller
 * @param {object} router
 */
module.exports = (router) => {

  router.get("/config",
    /**
     * @param {object} req
     * @param {object} res
     */
    async (req, res) => {
      const data = {};
      data.config = await Config.getConfig("Jule");
      req.vueOptions.head.title = "Configuration";
      req.vueOptions.head.styles.push({
        src: "https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-rc.2/css/uikit.min.css",
      });
      req.vueOptions.head.scripts.push({
        src: "https://unpkg.com/axios/dist/axios.min.js",
      });
      req.vueOptions.head.scripts.push({
        src: "https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-rc.2/js/uikit.min.js",
      });
      req.vueOptions.head.scripts.push({
        src: "https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-rc.2/js/uikit-icons.min.js",
      });

      res.renderVue("config/config.vue", data, req.vueOptions);
    },
  );

  router.post("/config",
    /**
     * @param {object} req
     * @param {object} res
     */
    async (req, res) => {
      Config.setConfig("Jule", parseFloat(req.body.slotLength), req.body.activities);
      res.json({
        message: `Set Config!`
      });
    },
  );

};
