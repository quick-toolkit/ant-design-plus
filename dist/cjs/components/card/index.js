"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlusCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
function PlusCard(props) {
    const { response, children, getResultProps } = props, rest = __rest(props, ["response", "children", "getResultProps"]);
    if (response) {
        switch (response.status) {
            case 200:
                return (0, jsx_runtime_1.jsx)(antd_1.Card, Object.assign({ children: children(response.data) }, rest));
            case 403:
                return ((0, jsx_runtime_1.jsx)(antd_1.Card, Object.assign({}, rest, { children: (0, jsx_runtime_1.jsx)(antd_1.Result, Object.assign({ title: "403", subTitle: "Forbidden" }, (getResultProps ? getResultProps(response.status) : {}), { status: 403 })) })));
            case 404:
                return ((0, jsx_runtime_1.jsx)(antd_1.Card, Object.assign({}, rest, { children: (0, jsx_runtime_1.jsx)(antd_1.Result, Object.assign({ title: "404", subTitle: "Page not found" }, (getResultProps ? getResultProps(response.status) : {}), { status: 404 })) })));
            default:
                return ((0, jsx_runtime_1.jsx)(antd_1.Card, Object.assign({}, rest, { children: (0, jsx_runtime_1.jsx)(antd_1.Result, Object.assign({ title: "500", subTitle: "Internal server error" }, (getResultProps ? getResultProps(response.status) : {}), { status: 500 })) })));
        }
    }
    return (0, jsx_runtime_1.jsx)(antd_1.Card, Object.assign({}, rest, { children: children(undefined) }));
}
exports.PlusCard = PlusCard;
