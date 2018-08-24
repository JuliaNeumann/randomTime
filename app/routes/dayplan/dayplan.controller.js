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
      const config = await Config.getConfig("Jule");
      const data = {
        numSlots: 0,
        tasks: [],
        message: '',
        error: '',
        slotLength: config.slotLength
      };
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

      res.renderVue("dayplan/dayplan.vue", data, req.vueOptions);
    },
  );

  router.post("/dayplan",
    /**
     * @param {object} req
     * @param {object} res
     */
    async (req, res) => {
      if (parseInt(req.body.hours) <= 20) {
        const dayPlan = await randomTime.getDayPlan(parseFloat(req.body.hours));
        if (dayPlan) {
          res.json({
            tasks: dayPlan
          });
          return;
        }
        res.json({
          message: 'No weekplan set.'
        });
        return;
      }
      res.send("");
    },
  );

};
