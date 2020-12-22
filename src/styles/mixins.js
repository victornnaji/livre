import { media } from "./media";
const { css } = require("styled-components");

const mixins = {
    flexBetween: css`
        display: flex;
        justify-content: space-between;
        align-items: center;
    `,
    container: css`
        width: 85%;
        margin: 0 auto;
        ${media.tablet`width: 90%`}
    `,
    flexCenter: css`
        display: flex;
        justify-content: center;
        align-items: center;
    `
}

export default mixins;