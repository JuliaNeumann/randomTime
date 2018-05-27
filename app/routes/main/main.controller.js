//@ts-check

/**
 * Main Route Contoller
 * @param {object} router
 */
module.exports = (router) => {
    router.get("/",
        /**
         * @param {object} req
         * @param {object} res
         */
        (req, res) => {
            req.vueOptions.head.title = "Random Time";
          req.vueOptions.head.styles.push({
            src: "https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-rc.2/css/uikit.min.css",
          });
          req.vueOptions.head.scripts.push({
            src: "https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-rc.2/js/uikit.min.js",
          });
          req.vueOptions.head.scripts.push({
            src: "https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-rc.2/js/uikit-icons.min.js",
          });
            res.renderVue("main/main.vue", {}, req.vueOptions);
        },
    );
};
