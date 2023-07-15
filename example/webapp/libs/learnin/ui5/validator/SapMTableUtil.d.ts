/// <reference types="openui5" />
/// <reference types="openui5" />
declare module "learnin/ui5/validator/SapMTableUtil" {
    import ColumnListItem from "sap/m/ColumnListItem";
    import Control from "sap/ui/core/Control";
    export default class SapMTableUtil {
        /**
         * oControl のラベルテキストを返す。
         *
         * @param {sap.ui.core.Control} oControl コントロール
         * @param {sap.m.ColumnListItem} oColumnListItem oControl の親
         * @returns {string} ラベルテキスト。ラベルが見つからない場合は undefined
         */
        static getLabelText(oControl: Control, oColumnListItem: ColumnListItem): string | undefined;
    }
}
//# sourceMappingURL=SapMTableUtil.d.ts.map