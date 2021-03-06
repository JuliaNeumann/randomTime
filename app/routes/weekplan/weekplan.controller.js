//@ts-check
const randomTime = require("../../services/randomTime");

/**
 * Main Route Contoller
 * @param {object} router
 */
module.exports = (router) => {

  router.get("/weekplan",
    /**
     * @param {object} req
     * @param {object} res
     */
    (req, res) => {
      const data = {
        numHours: 0,
        showSuccess: false
      };
      req.vueOptions.head.title = "Weekplan";
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

      res.renderVue("weekplan/weekplan.vue", data, req.vueOptions);
    },
  );

  router.post("/weekplan",
    /**
     * @param {object} req
     * @param {object} res
     */
    async (req, res) => {
      if (parseInt(req.body.hours) <= 100 && req.body.user) {
        const errorMsg = await randomTime.createWeekPlan(parseFloat(req.body.hours), req.body.user);
        if (errorMsg) {
          res.json({
            message: errorMsg
          });
          return;
        }
        res.json({
         success: true
        });
        return;
      }
      res.json({
        message: 'Invalid request: No user name or number of hours too high (max = 100).'
      });
    },
  );

};
