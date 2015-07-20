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
            'REOPEN_TREATMENT': 'Behandlung wieder öffnen',
            // Toolbar tooltips
            'ADVANCED_SEARCH_TOOLTIP': 'Erweiterte Suche',
            'GDT_TOOLTIP': 'GDT Untersuchung',
            'NEW_TREATMENT_TODAY_TOOLTIP': 'Neu heute',
            'NEW_TREATMENT_DIALOG_TOOLTIP': 'Neu mit Dialog',
            'OPEN_BIOMETRIC_REPORT_TOOLTIP': 'Blatt mit biom. Daten',
            'OPEN_LABORATORY_REPORT_TOOLTIP': 'Laborblatt',
            'OPEN_TREATMENT_REPORT_TOOLTIP': 'Bericht erstellen',
            'ASTERISK_SEARCH_TOOLTIP': '* Suchen',
            'REVERSE_ORDER_TOOLTIP': 'Sortierung umkehren',
            'APPOINTMENT_TOOLTIP': 'Neuer Termin',
            'RECALL_TOOLTIP': 'Neuer Recall',
            'TODO_TOOLTIP': 'Neue Aufgabe',
            'LOAD_ENTRIES_TOOLTIP': 'Alle Behandlungen neu laden',
            'CONFIGURATION_TOOLTIP': 'Konfiguration',
            // Config
            'LARGE_MARGINS': 'Grosse Abstände',
            'SMALL_MARGINS': 'Kleine Abstände',
            'SMALL_FONTS': 'Kleine Schrift',
            'MEDIUM_FONTS': 'Mittlere Schrift',
            'LARGE_FONTS': 'Grosse Schrift',
            'SHOW_TITLES': 'Titel zeigen',
            'SHOW_PRESETS': 'Strukturen verwalten',
            // Treatment tooltips
            'MEDICATION_TOOLTIP': 'Medikamente',
            'LABORATORY_TOOLTIP': 'Analysen',
            'DOCUMENT_TOOLTIP': 'Briefe',
            'DISABILITY_TOOLTIP': 'AUF',
            'BIOMETRIC_DATA_TOOLTIP': 'Biometrische Daten',
            'SERVICE_TOOLTIP': 'Leistungen',
            'DELETE_ROW': 'Eintrag löschen'
        });

        $translateProvider.translations('fr', {
            'TREATMENT_ENTRIES': 'Behandlungseinträge',
            'FROM_TO_TOTAL': '{{from}} bis {{to}} von {{total}}',
            'SEARCH': 'Suche'
        });

        $translateProvider.preferredLanguage('de');
    }
})();