/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define([],

    function () {


        /**
         * Validation function to be executed when sublist line is committed.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         *
         * @returns {boolean} Return true if sublist line is valid
         *
         * @since 2015.2
         */

        const ITEM = 'item'
        const objLocation = {
            NARANGBA: 'custcol_dose_narangba',
            BURNSRD: 'custcol_dose_burns'
        }
        const QUANTITY = 'quantity'
        const DOSE = 'DOSE'
        const DOSE_INDICATOR = 'custcol_dose_category'
        const DOSE_VALUES = ['Dead', 'Obsolete', 'Slow', 'Excess'];

        function validateLine(scriptContext) {

            let objCurrentRec = scriptContext.currentRecord
            log.debug('objCurrentRec', objCurrentRec)


            let strSublist = scriptContext.sublistId
            log.debug('strSublist', strSublist)
            if (strSublist == ITEM) {
                let blnIsDOSE = false
                for (let location in objLocation) {
                    log.debug('location', location)
                    let strLocation = objCurrentRec.getCurrentSublistValue({
                        sublistId: strSublist,
                        fieldId: objLocation[location]
                    })
                    if (!blnIsDOSE) {
                        blnIsDOSE = DOSE_VALUES.includes(strLocation)
                    }
                    log.debug('strLocation value', strLocation)
                }
                log.debug('blnIsDOSE value', blnIsDOSE)
                if (blnIsDOSE) {
                    let intQuantity = objCurrentRec.getCurrentSublistValue({
                        sublistId: strSublist,
                        fieldId: QUANTITY
                    })
                    if (intQuantity > 0) {
                        objCurrentRec.setCurrentSublistValue({
                            sublistId: strSublist,
                            fieldId: DOSE_INDICATOR,
                            value: DOSE
                        })
                    }
                }
            }

            return true
        }


        return {
            validateLine: validateLine,

        };

    });
