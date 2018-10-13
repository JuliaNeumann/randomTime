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
      if (req.body.user && req.body.slotLength && req.body.activities && req.body.activities.length > 0) {
        const errorMsg = await Config.setConfig(req.body.user, parseFloat(req.body.slotLength), req.body.activities);
        if (errorMsg) {
          res.json({
            message: errorMsg
          });
        }
        res.json({
          success: true
        });
        return;
      }
      res.json({
        message: 'Invalid request: No user name, slotLength or activities defined!'
      });
    },
  );

  router.get("/getConfigForUser",
    /**
     * @param {object} req
     * @param {object} res
     */
    async (req, res) => {
      if (req.query.user) {
        const config = await Config.getConfig(req.query.user);
        res.json(config);
      }
      res.json({});
    }
  );

};
