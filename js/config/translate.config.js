(function(){
    "use strict";

    angular
        .module('achilles')
        .config(translateProviderConfig);

    translateProviderConfig.$inject = ['$translateProvider'];
    function translateProviderConfig($translateProvider){
        $translateProvider.useSanitizeValueStrategy('escaped');

        $translateProvider.translations('de', {
            'TREATMENT_ENTRIES': 'Behandlungseinträge',
            'FROM_TO_TOTAL': '{{from}} bis {{to}} von {{total}}',
            'SEARCH': 'Suche',
            'PRESETS': 'Strukturen',
            'ENTRY_TYPES': 'Behandlungstitel',
            'TYPE_AND_PRESET_PLACEHOLDER': 'Neuer Behandlungstitel (F9)',
            'GO_TO_INVOICES': 'Gehe zu Rechnungen',
            'SERVICES': 'Leistungen',
            'NEW_SERVICES_TREATMENT': 'Neue Leistungen zu Behandlung',
            'NEW_SERVICES': 'Neue Leistungen',
            'SHOW_SERVICES': 'Leistungen zeigen',
            'BIOMETRIC_DATA': 'Biometrische Daten',
            'NEW_BIOMETRIC_DATA': 'Neue Biometrische Daten',
            'GO_TO_BIOMETRIC_DATA': 'Gehe zu Biometrische Daten',
            'DISABILITY': 'Arbeitsunfähigkeit',
            'NEW_DISABILITY': 'Neue Arbeitsunfähigkeit',
            'LETTERS_AND_DOCUMENTS': 'Briefe & Dokumente',
            'NEW_LETTER_TO': 'Neuer Brief an',
            'NEW_LETTER_FROM': 'Neuer Brief von',
            'NEW_DOCUMENT': 'Neues Dokument',
            'GO_TO_DOCUMENTS': 'Gehe zu Briefe & Dokumente',
            'LABORATORY': 'Labor-Resultate',
            'GO_TO_LABORATORY': 'Gehe zu Labor',
            'DRUGS': 'Medikamente',
            'DRUG_GIVEN': 'Abgeben',
            'DRUG_PRESCRIPTION': 'Rezept',
            'DRUG_FOREIGN': 'Fremd',
            'GO_TO_DRUGS': 'Gehe zu Medi-Listen',
            'SHOW_CASE': 'Fall: {{name}} anzeigen',
            'SHOW_INVOICE': 'Rechnung: {{id}} anzeigen',
            'CASE_SHORTHAND': 'F',
            'ASSIGN_CASE': 'Fall zuweisen...',
            'REMOVE_CASE': 'Ohne Fall',
            'GO_TO_CASES': 'Gehe zu Fälle & Garanten',
            'CREATE_PRESET': 'Neue Struktur',
            'REPLACE_PRESET': 'Struktur ersetzen',
            'ADD_TREATMENT': 'Neue Behandlung',
            'ADD_TREATMENT_COPY': 'Neue Behandlung (Kopie)',
            'ADD_SUBTREATMENT': 'Neue Nebenbehandlung',
            'ADD_NONMANDATOR_TREATMENT': 'Neue Nichtmandanten-Behandlung',
            'ADD_NONMANDATOR_SUBTREATMENT': 'Neue Nichtmandanten-Nebenbehandlung',
            'SET_TREATMENT': 'Behandlung einstellen',
            'DELETE_TREATMENT': 'Behandlung löschen',
            'CLOSE_TREATMENT': 'Behandlung schliessen',
            'REOPEN_TREATMENT': 'Behandlung wieder öffnen'
        });

        $translateProvider.translations('fr', {
            'TREATMENT_ENTRIES': 'Behandlungseinträge',
            'FROM_TO_TOTAL': '{{from}} bis {{to}} von {{total}}',
            'SEARCH': 'Suche'
        });

        $translateProvider.preferredLanguage('de');
    }
})();