"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.PlusTable = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
const react_1 = __importStar(require("react"));
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const setting_popover_1 = require("./setting-popover");
const use_columns_1 = require("./use-columns");
const utils_1 = require("./utils");
const classnames_1 = __importDefault(require("classnames"));
function PlusTable(props) {
    const { model, columns = [], size, cardProps, beforeTools, onReload, afterTools, noTools = false, noStyle = false } = props, rest = __rest(props, ["model", "columns", "size", "cardProps", "beforeTools", "onReload", "afterTools", "noTools", "noStyle"]);
    const columnsObj = (0, use_columns_1.useColumns)(model, columns);
    const [colSorts, setColSorts] = (0, react_1.useState)((0, lodash_clonedeep_1.default)(columnsObj));
    const children = (0, react_1.useMemo)(() => ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [!noTools && ((0, jsx_runtime_1.jsxs)(antd_1.Row, Object.assign({ className: "plus-table-tools", align: "middle", justify: "space-between" }, { children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(antd_1.Space, { children: beforeTools }) }), (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [afterTools, typeof onReload === 'function' && ((0, jsx_runtime_1.jsx)(antd_1.Button, { icon: (0, jsx_runtime_1.jsx)(icons_1.ReloadOutlined, {}), onClick: onReload })), (0, jsx_runtime_1.jsx)(setting_popover_1.SettingPopover, { columns: colSorts, onChange: (v) => setColSorts(v), onReset: () => setColSorts((0, lodash_clonedeep_1.default)(columnsObj)) })] })] }))), (0, jsx_runtime_1.jsx)(antd_1.Table, Object.assign({ size: size || 'small', columns: utils_1.ColumnUtils.filter(colSorts).map((x) => {
                    const find = columnsObj.find((o) => o.dataIndex === x.dataIndex);
                    return Object.assign(Object.assign(Object.assign({}, x), find), { hidden: x.hidden });
                }), rowKey: "id" }, rest))] })), [
        afterTools,
        beforeTools,
        colSorts,
        columnsObj,
        noTools,
        onReload,
        rest,
        size,
    ]);
    return react_1.default.createElement(noStyle ? 'div' : antd_1.Card, Object.assign(Object.assign({}, cardProps), { className: (0, classnames_1.default)('plus-table', cardProps ? cardProps.className : undefined), loading: Boolean(cardProps && cardProps.loading) ||
            Boolean(!rest.dataSource && rest.loading), children }));
}
exports.PlusTable = PlusTable;
