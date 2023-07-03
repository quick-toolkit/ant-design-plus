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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlusForm = exports.PlusFormContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const antd_1 = require("antd");
const class_mirror_1 = require("@quick-toolkit/class-mirror");
const classnames_1 = __importDefault(require("classnames"));
const utils_1 = require("../../utils");
const provider_1 = require("../provider");
const form_item_1 = require("../form-item");
const class_transformer_1 = require("@quick-toolkit/class-transformer");
const form_list_1 = require("../form-list");
const _PlusForm = (0, react_1.forwardRef)((props, ref) => {
    const { model, onFinish, onBeforeRequest, onResponse, onSuccess, onFail, className } = props, rest = __rest(props, ["model", "onFinish", "onBeforeRequest", "onResponse", "onSuccess", "onFail", "className"]);
    const mirrors = (0, react_1.useMemo)(() => class_mirror_1.ClassMirror.reflect(model).getAllProperties(), [model]);
    const { http, transformer } = (0, react_1.useContext)(provider_1.PlusContext);
    const fetchState = (0, react_1.useRef)(false);
    return ((0, jsx_runtime_1.jsx)(exports.PlusFormContext.Provider, Object.assign({ value: mirrors }, { children: (0, jsx_runtime_1.jsx)(antd_1.Form, Object.assign({ ref: ref, autoComplete: "off", autoCapitalize: "off", autoCorrect: "off", autoSave: "off", className: (0, classnames_1.default)('mq-plus-form', className), onFinish: (value) => __awaiter(void 0, void 0, void 0, function* () {
                if (onFinish) {
                    return onFinish(value);
                }
                try {
                    if (fetchState.current) {
                        return;
                    }
                    fetchState.current = true;
                    if (onBeforeRequest) {
                        yield onBeforeRequest(value);
                    }
                    if (http && transformer) {
                        const res = yield http.fetch(transformer.transform(model, value));
                        if (onSuccess) {
                            yield onSuccess(res, value);
                        }
                        if (onResponse) {
                            yield onResponse(res, value);
                        }
                    }
                    fetchState.current = false;
                }
                catch (e) {
                    fetchState.current = false;
                    if (e instanceof class_transformer_1.TransformerException) {
                        const error = e.exceptions[0];
                        if (error) {
                            antd_1.notification.error({
                                message: error.message,
                            });
                        }
                    }
                    if (onFail) {
                        yield onFail(e, value);
                    }
                    if (utils_1.EnvUtils.isDev()) {
                        console.error(e);
                    }
                }
            }) }, rest)) })));
});
exports.PlusFormContext = (0, react_1.createContext)(new Map());
exports.PlusForm = _PlusForm;
exports.PlusForm.Item = form_item_1.PlusFormItem;
exports.PlusForm.Context = exports.PlusFormContext;
exports.PlusForm.List = form_list_1.PlusFormList;
