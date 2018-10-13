//@ts-check
const randomTime = require("../../services/randomTime");
const Config = require("../../services/config");

/**
 * Main Route Contoller
 * @param {object} router
 */
module.exports = (router) => {

  router.get("/dayplan",
    /**
     * @param {object} req
     * @param {object} res
     */
    async (req, res) => {
      req.vueOptions.head.title = "Dayplan";
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

      res.renderVue("dayplan/dayplan.vue", {}, req.vueOptions);
    },
  );

  router.post("/dayplan",
    /**
     * @param {object} req
     * @param {object} res
     */
    async (req, res) => {
      if (parseInt(req.body.hours) <= 100 && req.body.user) {
        if (!parseInt(req.body.hours) > 0) {
          res.json({
            message: 'Provide a valid number of hours to get a dayplan.'
          });
          return;
        }
        const dayPlan = await randomTime.getDayPlan(parseFloat(req.body.hours), req.body.user);
        const config = await Config.getConfig(req.body.user);
        if (!config) {
          res.json({
            message: 'No valid config found for this user name.'
          });
          return;
        }
        if (dayPlan) {
          res.json({
            tasks: dayPlan,
            slotLength: config.slotLength
          });
          return;
        }
        res.json({
          message: 'No weekplan set for this user name.'
        });
        return;
      }
      res.json({
        message: 'Invalid request: No user name or number of hours too high (max = 100).'
      });
    },
  );

};
