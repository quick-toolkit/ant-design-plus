"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlusCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
function PlusCard(props) {
    const { response, children, getResultProps, ...rest } = props;
    if (response) {
        switch (response.status) {
            case 200:
                return (0, jsx_runtime_1.jsx)(antd_1.Card, { children: children(response.data), ...rest });
            case 403:
                return ((0, jsx_runtime_1.jsx)(antd_1.Card, { ...rest, children: (0, jsx_runtime_1.jsx)(antd_1.Result, { title: "403", subTitle: "Forbidden", ...(getResultProps ? getResultProps(response.status) : {}), status: 403 }) }));
            case 404:
                return ((0, jsx_runtime_1.jsx)(antd_1.Card, { ...rest, children: (0, jsx_runtime_1.jsx)(antd_1.Result, { title: "404", subTitle: "Page not found", ...(getResultProps ? getResultProps(response.status) : {}), status: 404 }) }));
            default:
                return ((0, jsx_runtime_1.jsx)(antd_1.Card, { ...rest, children: (0, jsx_runtime_1.jsx)(antd_1.Result, { title: "500", subTitle: "Internal server error", ...(getResultProps ? getResultProps(response.status) : {}), status: 500 }) }));
        }
    }
    return (0, jsx_runtime_1.jsx)(antd_1.Card, {});
}
exports.PlusCard = PlusCard;
