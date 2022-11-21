"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
exports.PlusButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const antd_1 = require("antd");
const utils_1 = require("../../utils");
exports.PlusButton = (0, react_1.forwardRef)((props, ref) => {
    const { onClick, onClickError } = props, rest = __rest(props, ["onClick", "onClickError"]);
    const [loading, setLoading] = (0, react_1.useState)(false);
    return ((0, jsx_runtime_1.jsx)(antd_1.Button, Object.assign({}, rest, { loading: rest.loading || loading, ref: ref, onClick: (...args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (typeof onClick === 'function') {
                    const res = onClick(...args);
                    if (utils_1.TypeUtils.isPromise(res)) {
                        setLoading(true);
                        yield res;
                    }
                }
            }
            catch (e) {
                if (typeof onClickError === 'function') {
                    onClickError(e);
                }
                if (utils_1.EnvUtils.isDev()) {
                    console.log(e);
                }
            }
            finally {
                setLoading(false);
            }
        }) })));
});
