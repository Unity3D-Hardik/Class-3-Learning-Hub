/*
 * Class 3 Learning Hub — school test presets
 * ------------------------------------------------------------------
 * Each preset mirrors a real school test syllabus, so the child can
 * practise exactly the chapters that will be examined.
 *
 * To add the next test: copy the block below, change the id/name/dates
 * and list the chapter ids for each subject. Chapter ids must match the
 * generator keys in bank/*.js.
 */
window.HubExamPresets = [
    {
        id: 'cares-2-2026',
        name: 'CARES Test-2',
        school: 'ASIA English School',
        session: '2026-27',
        grade: 'Grade III',
        format: 'MCQs',
        subjects: {
            english: {
                date: '2026-08-31',
                day: 'Monday',
                // Word meanings, synonyms/antonyms, compound & rhyming words,
                // 2-syllable & silent letters, adjectives/adverbs, degrees,
                // alphabetical order & comma, forms of 'be', regular/irregular
                // verbs + the three tenses, nouns, articles & prepositions,
                // conjunctions/pronouns/interrogatives, sentence formation.
                chapters: [
                    'eng_word_meanings',
                    'eng_synonym_antonym',
                    'eng_compound_rhyme',
                    'eng_syllables_silent',
                    'eng_adjectives_adverbs',
                    'eng_degrees_comp',
                    'eng_alphabetical_comma',
                    'eng_be_verbs',
                    'eng_verbs_tenses',
                    'eng_nouns',
                    'eng_articles_prep',
                    'eng_interrogatives_conj_pronouns',
                    'eng_sentence'
                ]
            },
            math: {
                date: '2026-09-01',
                day: 'Tuesday',
                // Ch-4 Vacation with My Nani Maa • Ch-6 House of Hundreds - I
                chapters: [
                    'ch4_shapes',
                    'ch4_lines',
                    'ch4_paths',
                    'ch4_spans',
                    'ch6_placeval',
                    'ch6_expanded',
                    'ch6_words',
                    'ch6_compare',
                    'ch6_patterns',
                    'ch6_building'
                ]
            },
            evs: {
                date: '2026-09-02',
                day: 'Wednesday',
                // Ch-3 Festivals • Ch-4 Plants • Ch-5 Plants and Animals • Ch-6 Harmony
                chapters: [
                    'evs_ch3_festivals',
                    'evs_ch4_plants',
                    'evs_ch5_coexistence',
                    'evs_ch6_harmony'
                ]
            }
        }
    }
];
