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
exports.PlusModal = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const antd_1 = require("antd");
const utils_1 = require("../../utils");
const hooks_1 = require("../../hooks");
const utils_2 = require("../../utils");
function PlusModal(props) {
    const { onOk, confirmLoading, model } = props, rest = __rest(props, ["onOk", "confirmLoading", "model"]);
    const locale = (0, hooks_1.usePlusLocale)();
    const [loading, setLoading] = (0, react_1.useState)(false);
    const title = (0, react_1.useMemo)(() => {
        if (rest.title) {
            return rest.title;
        }
        else if (model) {
            return utils_2.LocaleUtils.getModelLocale(model, locale.language);
        }
    }, [locale.language, model, rest.title]);
    return ((0, jsx_runtime_1.jsx)(antd_1.Modal, Object.assign({ maskClosable: false, destroyOnClose: true, keyboard: false, title: title, visible: Boolean(model), confirmLoading: loading || confirmLoading, onOk: (e) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (onOk) {
                    const res = onOk(e);
                    if (utils_1.TypeUtils.isPromise(res)) {
                        setLoading(true);
                        yield res;
                    }
                }
            }
            catch (e) {
                if (utils_1.EnvUtils.isDev()) {
                    console.error(e);
                }
            }
            finally {
                setLoading(false);
            }
        }) }, rest)));
}
exports.PlusModal = PlusModal;
