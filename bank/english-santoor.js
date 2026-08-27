/*
 * Class 3 Learning Hub - English question bank
 * ------------------------------------------------------------------
 * Book   : NCERT Santoor 3 + Echoes reader (Class 3)
 * Subject: english
 * Requires bank/core.js to be loaded first.
 */
(function (global) {
    'use strict';

    const B = global.ClassThreeBank;
    const randInt = B.utils.randInt;
    const shuffle = B.utils.shuffle;
    const pick = B.utils.pick;
    const buildQuestion = B.buildQuestion;
    const bankGenerator = B.bankGenerator;
    const mix = B.mix;

    /* ===============================================================
     * ENGLISH - NCERT "Santoor" Class 3 + "Echoes" reader
     * =============================================================== */

    /* --- Word meanings in context ---------------------------------- */
    const VOCAB = [
        { word: 'delighted', meaning: 'very happy and pleased', sentence: 'Anaya was delighted with her new storybook.' },
        { word: 'gather', meaning: 'to come together in one place', sentence: 'The children gather around the teacher for story time.' },
        { word: 'curious', meaning: 'eager to learn or know something', sentence: 'The curious cat explored the whole garden.' },
        { word: 'spotted', meaning: 'noticed or saw suddenly', sentence: 'Rohan spotted a rainbow in the sky.' },
        { word: 'ancient', meaning: 'belonging to the very distant past', sentence: 'The museum had ancient coins from long ago.' },
        { word: 'flutter', meaning: 'to flap the wings quickly and lightly', sentence: 'Butterflies flutter around colourful flowers.' },
        { word: 'gleefully', meaning: 'in a joyful, cheerful way', sentence: 'The kids cheered gleefully after winning.' },
        { word: 'shelter', meaning: 'a place that protects from bad weather', sentence: 'The birds took shelter under the big green leaves.' },
        { word: 'whisper', meaning: 'to speak very softly', sentence: 'Please whisper so that you do not wake the baby.' },
        { word: 'harvest', meaning: 'gathering ripe crops from the fields', sentence: 'Farmers celebrate during the autumn harvest.' },
        { word: 'enormous', meaning: 'extremely big in size', sentence: 'An enormous elephant blocked the narrow path.' },
        { word: 'weary', meaning: 'very tired', sentence: 'The weary traveller sat down under a banyan tree.' },
        { word: 'glisten', meaning: 'to shine with a soft sparkle', sentence: 'Dew drops glisten on the grass in the morning.' },
        { word: 'murmur', meaning: 'a low continuous soft sound', sentence: 'We could hear the murmur of the little stream.' },
        { word: 'brave', meaning: 'showing courage and no fear', sentence: 'The brave girl saved the puppy from the drain.' },
        { word: 'clever', meaning: 'quick to learn and understand', sentence: 'The clever crow dropped pebbles into the pot.' },
        { word: 'greedy', meaning: 'wanting much more than one needs', sentence: 'The greedy dog lost his bone in the river.' },
        { word: 'dawn', meaning: 'the first light of the morning', sentence: 'The farmer wakes up at dawn to work in the field.' },
        { word: 'dusk', meaning: 'the time just before night falls', sentence: 'Birds return to their nests at dusk.' },
        { word: 'stroll', meaning: 'to walk slowly for pleasure', sentence: 'We went for an evening stroll in the park.' }
    ];

    const eng_word_meanings_proc = () => {
        const item = pick(VOCAB);
        const others = shuffle(VOCAB.filter((v) => v.word !== item.word)).slice(0, 3).map((v) => v.meaning);
        return buildQuestion({
            topic: 'eng_word_meanings',
            badge: 'Santoor: Word Meanings',
            q: 'What does the word <strong>"' + item.word + '"</strong> mean in this sentence?<br><em>"' + item.sentence + '"</em>',
            ans: item.meaning,
            wrong: others,
            hint: 'Read the whole sentence and think about what is happening.',
            exp: 'In this context, "' + item.word + '" means <strong>' + item.meaning + '</strong>.'
        });
    };

    /* --- Synonyms & Antonyms --------------------------------------- */
    const SYN_ANT = [
        { word: 'Glad', syn: 'Happy', ant: 'Sad' },
        { word: 'Brave', syn: 'Courageous', ant: 'Cowardly' },
        { word: 'Ancient', syn: 'Old', ant: 'Modern' },
        { word: 'Rapid', syn: 'Fast', ant: 'Slow' },
        { word: 'Huge', syn: 'Large', ant: 'Tiny' },
        { word: 'Silent', syn: 'Quiet', ant: 'Noisy' },
        { word: 'Bright', syn: 'Shining', ant: 'Dull' },
        { word: 'Sweet', syn: 'Sugary', ant: 'Sour' },
        { word: 'Tidy', syn: 'Neat', ant: 'Messy' },
        { word: 'Gentle', syn: 'Kind', ant: 'Harsh' },
        { word: 'Begin', syn: 'Start', ant: 'End' },
        { word: 'Wealthy', syn: 'Rich', ant: 'Poor' },
        { word: 'Difficult', syn: 'Hard', ant: 'Easy' },
        { word: 'Beautiful', syn: 'Pretty', ant: 'Ugly' },
        { word: 'Empty', syn: 'Vacant', ant: 'Full' },
        { word: 'Arrive', syn: 'Reach', ant: 'Depart' },
        { word: 'Weary', syn: 'Tired', ant: 'Fresh' },
        { word: 'Shout', syn: 'Yell', ant: 'Whisper' },
        { word: 'Wide', syn: 'Broad', ant: 'Narrow' },
        { word: 'Cheerful', syn: 'Merry', ant: 'Gloomy' }
    ];

    const eng_synonym_antonym_proc = () => {
        const item = pick(SYN_ANT);
        const askSyn = Math.random() > 0.5;
        const ans = askSyn ? item.syn : item.ant;
        const others = shuffle(SYN_ANT.filter((p) => p.word !== item.word))
            .slice(0, 3)
            .map((p) => (askSyn ? p.syn : p.ant));

        return buildQuestion({
            topic: 'eng_synonym_antonym',
            badge: 'Santoor: Synonyms & Antonyms',
            q: 'Choose the <strong>' + (askSyn ? 'SYNONYM (same meaning)' : 'ANTONYM (opposite meaning)') + '</strong> of the word <strong>"' + item.word + '"</strong>.',
            ans: ans,
            wrong: others.concat([askSyn ? item.ant : item.syn]),
            hint: askSyn ? 'A synonym means almost the same thing.' : 'An antonym means exactly the opposite.',
            exp: 'The ' + (askSyn ? 'synonym' : 'antonym') + ' of "' + item.word + '" is <strong>' + ans + '</strong>.'
        });
    };

    /* --- Compound words & rhymes ----------------------------------- */
    const COMPOUNDS = [
        { w1: 'Sun', w2: 'flower', res: 'Sunflower' },
        { w1: 'Rain', w2: 'bow', res: 'Rainbow' },
        { w1: 'Butter', w2: 'fly', res: 'Butterfly' },
        { w1: 'Tooth', w2: 'brush', res: 'Toothbrush' },
        { w1: 'Star', w2: 'fish', res: 'Starfish' },
        { w1: 'Foot', w2: 'ball', res: 'Football' },
        { w1: 'Class', w2: 'room', res: 'Classroom' },
        { w1: 'Note', w2: 'book', res: 'Notebook' },
        { w1: 'Play', w2: 'ground', res: 'Playground' },
        { w1: 'Black', w2: 'board', res: 'Blackboard' },
        { w1: 'Bed', w2: 'room', res: 'Bedroom' },
        { w1: 'Grand', w2: 'mother', res: 'Grandmother' },
        { w1: 'Water', w2: 'fall', res: 'Waterfall' },
        { w1: 'Birth', w2: 'day', res: 'Birthday' },
        { w1: 'Rail', w2: 'way', res: 'Railway' }
    ];

    const RHYMES = [
        { word: 'Light', rhyme: 'Night', no: ['Tree', 'Book', 'Chair'] },
        { word: 'Play', rhyme: 'Day', no: ['Bird', 'Fish', 'Jump'] },
        { word: 'Ring', rhyme: 'Sing', no: ['Walk', 'Table', 'Apple'] },
        { word: 'Cat', rhyme: 'Hat', no: ['Dog', 'Cup', 'Pen'] },
        { word: 'Moon', rhyme: 'Spoon', no: ['Star', 'Sky', 'Cloud'] },
        { word: 'Bell', rhyme: 'Shell', no: ['Drum', 'Horn', 'Flute'] },
        { word: 'Tree', rhyme: 'Bee', no: ['Leaf', 'Root', 'Branch'] },
        { word: 'Snow', rhyme: 'Blow', no: ['Rain', 'Ice', 'Wind'] },
        { word: 'Mouse', rhyme: 'House', no: ['Rat', 'Cheese', 'Hole'] },
        { word: 'Cake', rhyme: 'Lake', no: ['Sweet', 'Bake', 'Party'] }
    ];

    const eng_compound_rhyme_proc = () => {
        if (Math.random() > 0.5) {
            const item = pick(COMPOUNDS);
            return buildQuestion({
                topic: 'eng_compound_rhyme',
                badge: 'Santoor: Compound Words',
                q: 'Join these two words to make a <strong>compound word</strong>: <strong>"' + item.w1 + '" + "' + item.w2 + '"</strong>',
                ans: item.res,
                wrong: [item.w1 + 'ing', item.w2 + 'ed', item.w1 + 'less', item.w2 + 'ly'],
                hint: 'Write both words together with no space in between.',
                exp: item.w1 + ' + ' + item.w2 + ' = <strong>' + item.res + '</strong>.'
            });
        }
        const item = pick(RHYMES);
        return buildQuestion({
            topic: 'eng_compound_rhyme',
            badge: 'Santoor: Rhyming Words',
            q: 'Which word <strong>rhymes</strong> with <strong>"' + item.word + '"</strong>?',
            ans: item.rhyme,
            wrong: item.no,
            hint: 'Rhyming words end with the same sound.',
            exp: '"' + item.word + '" and "' + item.rhyme + '" have the same ending sound.'
        });
    };

    /* --- Syllables & silent letters --------------------------------- */
    const SILENT = [
        { word: 'Knight', silent: 'K', others: ['N', 'I', 'T'] },
        { word: 'Climb', silent: 'B', others: ['L', 'I', 'M'] },
        { word: 'Write', silent: 'W', others: ['R', 'I', 'T'] },
        { word: 'Listen', silent: 'T', others: ['L', 'S', 'N'] },
        { word: 'Wrist', silent: 'W', others: ['R', 'S', 'T'] },
        { word: 'Knee', silent: 'K', others: ['N', 'E', 'W'] },
        { word: 'Comb', silent: 'B', others: ['C', 'O', 'M'] },
        { word: 'Hour', silent: 'H', others: ['O', 'U', 'R'] },
        { word: 'Island', silent: 'S', others: ['I', 'L', 'D'] },
        { word: 'Ghost', silent: 'H', others: ['G', 'O', 'T'] },
        { word: 'Lamb', silent: 'B', others: ['L', 'A', 'M'] },
        { word: 'Honest', silent: 'H', others: ['O', 'N', 'T'] }
    ];

    const SYLLABLES = [
        { word: 'Sun', n: 1, split: 'Sun' },
        { word: 'Cat', n: 1, split: 'Cat' },
        { word: 'Rainbow', n: 2, split: 'Rain-bow' },
        { word: 'Garden', n: 2, split: 'Gar-den' },
        { word: 'Pencil', n: 2, split: 'Pen-cil' },
        { word: 'Butterfly', n: 3, split: 'But-ter-fly' },
        { word: 'Elephant', n: 3, split: 'El-e-phant' },
        { word: 'Umbrella', n: 3, split: 'Um-brel-la' },
        { word: 'Television', n: 4, split: 'Tel-e-vi-sion' },
        { word: 'Alphabet', n: 3, split: 'Al-pha-bet' },
        { word: 'Book', n: 1, split: 'Book' },
        { word: 'Teacher', n: 2, split: 'Teach-er' }
    ];

    const eng_syllables_silent_proc = () => {
        if (Math.random() > 0.5) {
            const item = pick(SILENT);
            return buildQuestion({
                topic: 'eng_syllables_silent',
                badge: 'Echoes: Silent Letters',
                q: 'Which letter is <strong>SILENT</strong> in the word <strong>"' + item.word + '"</strong>?',
                ans: item.silent,
                wrong: item.others,
                hint: 'A silent letter is written but not heard when you say the word aloud.',
                exp: 'In "' + item.word + '" the letter <strong>' + item.silent + '</strong> is not pronounced.'
            });
        }
        const item = pick(SYLLABLES);
        return buildQuestion({
            topic: 'eng_syllables_silent',
            badge: 'Echoes: Syllable Beats',
            q: 'How many <strong>syllables</strong> (clapping beats) does the word <strong>"' + item.word + '"</strong> have?',
            ans: item.n,
            wrong: [item.n + 1, Math.max(1, item.n - 1), item.n + 2],
            hint: 'Clap once for every vowel sound you hear.',
            exp: '"' + item.word + '" breaks up as <strong>' + item.split + '</strong> → ' + item.n + ' syllable(s).'
        });
    };

    /* --- Adjectives & adverbs --------------------------------------- */
    const eng_adjectives_adverbs_bank = bankGenerator('eng_adjectives_adverbs', 'Santoor: Adjectives & Adverbs', [
        { q: 'Pick the <strong>adjective</strong>: "The <u>tall</u> boy quickly ran home."', ans: 'tall', wrong: ['quickly', 'ran', 'home'], hint: 'An adjective describes a noun.', exp: '"tall" describes the noun "boy".' },
        { q: 'Pick the <strong>adverb</strong>: "The tall boy <u>quickly</u> ran home."', ans: 'quickly', wrong: ['tall', 'boy', 'home'], hint: 'An adverb tells HOW an action is done.', exp: '"quickly" tells how he ran.' },
        { q: 'Complete with an <strong>adverb of manner</strong>: "The turtle walked ___ across the path."', ans: 'slowly', wrong: ['slow', 'slowness', 'slower'], hint: 'Adverbs of manner usually end in -ly.', exp: '"slowly" describes how the turtle walked.' },
        { q: 'Complete with an <strong>adjective</strong>: "Rohan ate a ___ and juicy mango."', ans: 'sweet', wrong: ['sweetly', 'sweetness', 'quickly'], hint: 'It must describe the mango.', exp: '"sweet" is an adjective describing the mango.' },
        { q: 'Which word is an <strong>adjective of colour</strong>?', ans: 'Golden', wrong: ['Quickly', 'Running', 'Under'], hint: 'It names a colour.', exp: '"Golden" describes colour.' },
        { q: 'Change the adjective <strong>"happy"</strong> into an adverb.', ans: 'happily', wrong: ['happiness', 'happier', 'happyly'], hint: 'Change y to i and add -ly.', exp: 'happy → happily.' },
        { q: 'Change the adjective <strong>"careful"</strong> into an adverb.', ans: 'carefully', wrong: ['carefuly', 'carefulness', 'carefuler'], hint: 'Just add -ly.', exp: 'careful → carefully.' },
        { q: 'Which sentence uses the adjective <strong>correctly</strong>?', ans: 'She wore a beautiful dress.', wrong: ['She wore a beautifully dress.', 'She beautiful wore a dress.', 'She wore a dress beautiful.'], hint: 'Adjectives come before the noun.', exp: 'The adjective "beautiful" goes before the noun "dress".' },
        { q: 'In "The <u>five</u> puppies barked", the word "five" is an adjective of...', ans: 'Number', wrong: ['Quality', 'Colour', 'Manner'], hint: 'It tells how many.', exp: 'Adjectives of number tell how many.' },
        { q: 'Pick the <strong>adverb of time</strong>: "We will go to Nani\'s house <u>tomorrow</u>."', ans: 'tomorrow', wrong: ['go', 'house', 'Nani'], hint: 'It tells WHEN.', exp: '"tomorrow" tells when the action happens.' }
    ]);

    /* --- Degrees of comparison -------------------------------------- */
    const DEGREES = [
        { pos: 'tall', comp: 'taller', sup: 'tallest' },
        { pos: 'fast', comp: 'faster', sup: 'fastest' },
        { pos: 'bright', comp: 'brighter', sup: 'brightest' },
        { pos: 'big', comp: 'bigger', sup: 'biggest' },
        { pos: 'small', comp: 'smaller', sup: 'smallest' },
        { pos: 'happy', comp: 'happier', sup: 'happiest' },
        { pos: 'long', comp: 'longer', sup: 'longest' },
        { pos: 'hot', comp: 'hotter', sup: 'hottest' },
        { pos: 'clean', comp: 'cleaner', sup: 'cleanest' },
        { pos: 'young', comp: 'younger', sup: 'youngest' }
    ];

    const eng_degrees_comp_proc = () => {
        const item = pick(DEGREES);
        const askSup = Math.random() > 0.4;
        if (askSup) {
            return buildQuestion({
                topic: 'eng_degrees_comp',
                badge: 'Santoor: Degrees of Comparison',
                q: 'Complete the chain: <strong>' + item.pos + ' → ' + item.comp + ' → [ ? ]</strong>',
                ans: item.sup,
                wrong: [item.pos + 'ly', item.pos + 'ness', 'most ' + item.pos, item.comp + 'er'],
                hint: 'Positive → Comparative (-er) → Superlative (-est).',
                exp: 'The superlative of "' + item.pos + '" is <strong>' + item.sup + '</strong>.'
            });
        }
        return buildQuestion({
            topic: 'eng_degrees_comp',
            badge: 'Santoor: Degrees of Comparison',
            q: 'Fill in the blank: <em>"Riya is ___ than her sister."</em> (' + item.pos + ')',
            ans: item.comp,
            wrong: [item.pos, item.sup, 'more ' + item.pos, item.pos + 'ly'],
            hint: 'The word "than" always signals the comparative degree.',
            exp: 'When comparing two people we use the comparative: <strong>' + item.comp + '</strong>.'
        });
    };

    /* --- Alphabetical order, commas & punctuation -------------------- */
    const eng_alphabetical_comma_bank = bankGenerator('eng_alphabetical_comma', 'Echoes: Order & Punctuation', [
        { q: 'Which list is in correct <strong>alphabetical order</strong>?', ans: 'Apple, Banana, Cat, Dog', wrong: ['Dog, Cat, Banana, Apple', 'Banana, Apple, Dog, Cat', 'Cat, Dog, Apple, Banana'], hint: 'Compare the first letters: A, B, C, D.', exp: 'A → B → C → D is correct alphabetical order.' },
        { q: 'Which word comes <strong>first</strong> in a dictionary?', ans: 'Cricket', wrong: ['Crown', 'Cup', 'Cycle'], hint: 'Compare letter by letter: Cr-i comes before Cr-o.', exp: 'Cricket comes first alphabetically.' },
        { q: 'Where do the commas go?<br><em>"I bought apples bananas oranges and mangoes."</em>', ans: 'I bought apples, bananas, oranges and mangoes.', wrong: ['I bought, apples bananas, oranges and mangoes.', 'I bought apples bananas, oranges, and, mangoes.', 'I, bought apples, bananas oranges and mangoes.'], hint: 'Commas separate items in a list.', exp: 'Use commas between listed items; the last two are joined by "and".' },
        { q: 'Which punctuation mark ends a <strong>question</strong>?', ans: 'Question mark ( ? )', wrong: ['Full stop ( . )', 'Comma ( , )', 'Exclamation mark ( ! )'], hint: 'It is curved with a dot below.', exp: 'Questions end with a question mark.' },
        { q: 'Which punctuation mark shows <strong>strong feeling</strong>?', ans: 'Exclamation mark ( ! )', wrong: ['Full stop ( . )', 'Comma ( , )', 'Question mark ( ? )'], hint: 'Wow! Hurray!', exp: 'Exclamation marks show surprise, joy or shock.' },
        { q: 'Which sentence is punctuated <strong>correctly</strong>?', ans: 'Where is my blue school bag?', wrong: ['where is my blue school bag?', 'Where is my blue school bag.', 'Where is my blue school bag'], hint: 'Capital letter at the start, question mark at the end.', exp: 'A question starts with a capital and ends with "?".' },
        { q: 'Which words always begin with a <strong>capital letter</strong>?', ans: 'Names of people, places and days', wrong: ['All nouns', 'All verbs', 'Only the word "the"'], hint: 'Think about proper nouns.', exp: 'Proper nouns and the first word of a sentence take capitals.' },
        { q: 'Arrange alphabetically: <em>mango, apple, guava, banana</em>. Which comes <strong>last</strong>?', ans: 'mango', wrong: ['apple', 'banana', 'guava'], hint: 'a, b, g, m.', exp: 'mango starts with "m", the latest letter here.' },
        { q: 'Choose the correctly written sentence.', ans: 'My friend Riya lives in Delhi.', wrong: ['my friend riya lives in delhi.', 'My Friend riya lives In delhi.', 'my Friend Riya Lives in Delhi'], hint: 'Capitalise the first word and proper nouns only.', exp: 'Only "My", "Riya" and "Delhi" need capitals.' }
    ]);

    /* --- Forms of 'be' ---------------------------------------------- */
    const BE_ITEMS = [
        { sent: 'I ___ going to Nani Maa\'s village today.', ans: 'am' },
        { sent: 'They ___ playing football in the garden.', ans: 'are' },
        { sent: 'Yesterday, she ___ absent from school.', ans: 'was' },
        { sent: 'We ___ very happy to win the match yesterday.', ans: 'were' },
        { sent: 'The sun ___ shining brightly right now.', ans: 'is' },
        { sent: 'You ___ my best friend.', ans: 'are' },
        { sent: 'Last week the roads ___ full of water.', ans: 'were' },
        { sent: 'My grandfather ___ a farmer many years ago.', ans: 'was' },
        { sent: 'It ___ a very cold morning today.', ans: 'is' },
        { sent: 'The puppies ___ sleeping in the basket now.', ans: 'are' }
    ];

    const eng_be_verbs_proc = () => {
        const item = pick(BE_ITEMS);
        return buildQuestion({
            topic: 'eng_be_verbs',
            badge: "Santoor: Forms of 'be'",
            q: 'Choose the correct form of the verb <strong>be</strong>:<br><em>"' + item.sent + '"</em>',
            ans: item.ans,
            wrong: ['am', 'is', 'are', 'was', 'were'].filter((w) => w !== item.ans),
            hint: 'Check whether the subject is singular or plural, and whether the time is present or past.',
            exp: 'The correct form here is <strong>' + item.ans + '</strong>.'
        });
    };

    /* --- Tenses ------------------------------------------------------ */
    const TENSE_ITEMS = [
        { sent: 'Yesterday, Rahul ___ a delicious apple.', ans: 'ate', base: 'eat', tense: 'Simple Past' },
        { sent: 'Look! The puppies are ___ in the garden right now.', ans: 'playing', base: 'play', tense: 'Present Continuous' },
        { sent: 'She ___ gracefully every morning.', ans: 'dances', base: 'dance', tense: 'Simple Present' },
        { sent: 'Last Sunday we ___ to the zoo.', ans: 'went', base: 'go', tense: 'Simple Past' },
        { sent: 'The baby is ___ loudly at the moment.', ans: 'crying', base: 'cry', tense: 'Present Continuous' },
        { sent: 'Birds ___ in the sky.', ans: 'fly', base: 'fly', tense: 'Simple Present' },
        { sent: 'He ___ his homework last night.', ans: 'did', base: 'do', tense: 'Simple Past' },
        { sent: 'Mother ___ tea every morning.', ans: 'makes', base: 'make', tense: 'Simple Present' },
        { sent: 'The children are ___ a sandcastle now.', ans: 'building', base: 'build', tense: 'Present Continuous' },
        { sent: 'I ___ a beautiful bird yesterday.', ans: 'saw', base: 'see', tense: 'Simple Past' }
    ];

    const eng_verbs_tenses_proc = () => {
        const item = pick(TENSE_ITEMS);
        const regular = item.base.endsWith('e') ? item.base + 'd' : item.base + 'ed';
        const ing = item.base.endsWith('e') ? item.base.slice(0, -1) + 'ing' : item.base + 'ing';
        return buildQuestion({
            topic: 'eng_verbs_tenses',
            badge: 'Santoor: ' + item.tense,
            q: 'Fill in the blank with the correct verb form:<br><em>"' + item.sent + '"</em>',
            ans: item.ans,
            wrong: [item.base, regular, ing, 'will ' + item.base].filter((w) => w !== item.ans),
            hint: 'Look for time clues like "yesterday", "right now", "every morning".',
            exp: 'This sentence is in the <strong>' + item.tense + '</strong> tense, so the correct form is <strong>' + item.ans + '</strong>.'
        });
    };

    const eng_verbs_tenses_bank = bankGenerator('eng_verbs_tenses', 'Santoor: Verbs & Tenses', [
        { q: 'What is the <strong>past tense</strong> of "run"?', ans: 'ran', wrong: ['runned', 'running', 'runs'], hint: 'It is an irregular verb.', exp: 'run → ran.' },
        { q: 'What is the <strong>past tense</strong> of "buy"?', ans: 'bought', wrong: ['buyed', 'buying', 'buys'], hint: 'Irregular verb.', exp: 'buy → bought.' },
        { q: 'What is the <strong>past tense</strong> of "write"?', ans: 'wrote', wrong: ['writed', 'writing', 'written'], hint: 'Irregular verb.', exp: 'write → wrote.' },
        { q: 'What is the <strong>past tense</strong> of "jump"?', ans: 'jumped', wrong: ['jumpt', 'jumping', 'jumps'], hint: 'Regular verb — just add -ed.', exp: 'jump → jumped.' },
        { q: 'Which sentence is in the <strong>present continuous</strong> tense?', ans: 'She is reading a book.', wrong: ['She read a book.', 'She reads books.', 'She will read a book.'], hint: 'Look for is/am/are + verb-ing.', exp: '"is reading" shows an action happening right now.' },
        { q: 'Which word is a <strong>verb</strong> (action word)?', ans: 'swim', wrong: ['blue', 'table', 'slowly'], hint: 'It is something you do.', exp: '"swim" is an action word.' },
        { q: 'Choose the correct sentence.', ans: 'He goes to school every day.', wrong: ['He go to school every day.', 'He going to school every day.', 'He gone to school every day.'], hint: 'With he/she/it, add -s in simple present.', exp: 'Singular third person takes "goes".' },
        { q: 'The past tense of "teach" is...', ans: 'taught', wrong: ['teached', 'teaching', 'teaches'], hint: 'Irregular verb.', exp: 'teach → taught.' },
        { q: 'The -ing form of "sit" is...', ans: 'sitting', wrong: ['siting', 'sitted', 'sits'], hint: 'Double the last consonant.', exp: 'sit → sitting.' }
    ]);

    /* --- Nouns ------------------------------------------------------- */
    const NOUN_ITEMS = [
        { word: 'India', type: 'Proper Noun' },
        { word: 'Diwali', type: 'Proper Noun' },
        { word: 'Ganga', type: 'Proper Noun' },
        { word: 'city', type: 'Common Noun' },
        { word: 'teacher', type: 'Common Noun' },
        { word: 'river', type: 'Common Noun' },
        { word: 'milk', type: 'Uncountable Noun' },
        { word: 'water', type: 'Uncountable Noun' },
        { word: 'sugar', type: 'Uncountable Noun' },
        { word: 'books', type: 'Countable Plural Noun' },
        { word: 'mangoes', type: 'Countable Plural Noun' }
    ];

    const eng_nouns_proc = () => {
        const item = pick(NOUN_ITEMS);
        return buildQuestion({
            topic: 'eng_nouns',
            badge: 'Santoor: Nouns',
            q: 'What kind of noun is the word <strong>"' + item.word + '"</strong>?',
            ans: item.type,
            wrong: ['Proper Noun', 'Common Noun', 'Uncountable Noun', 'Countable Plural Noun'],
            hint: 'Proper nouns name a particular person/place and start with a capital. Uncountable nouns cannot be counted one by one.',
            exp: '"' + item.word + '" is a <strong>' + item.type + '</strong>.'
        });
    };

    const eng_nouns_bank = bankGenerator('eng_nouns', 'Santoor: Nouns & Plurals', [
        { q: 'What is the plural of <strong>"baby"</strong>?', ans: 'babies', wrong: ['babys', 'babyes', 'baby'], hint: 'Change y to i and add -es.', exp: 'baby → babies.' },
        { q: 'What is the plural of <strong>"child"</strong>?', ans: 'children', wrong: ['childs', 'childes', 'childrens'], hint: 'Irregular plural.', exp: 'child → children.' },
        { q: 'What is the plural of <strong>"mouse"</strong>?', ans: 'mice', wrong: ['mouses', 'mouse', 'mices'], hint: 'Irregular plural.', exp: 'mouse → mice.' },
        { q: 'What is the plural of <strong>"leaf"</strong>?', ans: 'leaves', wrong: ['leafs', 'leafes', 'leave'], hint: 'Change f to v and add -es.', exp: 'leaf → leaves.' },
        { q: 'What is the plural of <strong>"box"</strong>?', ans: 'boxes', wrong: ['boxs', 'boxies', 'box'], hint: 'Words ending in x take -es.', exp: 'box → boxes.' },
        { q: 'What is the plural of <strong>"foot"</strong>?', ans: 'feet', wrong: ['foots', 'footes', 'feets'], hint: 'Irregular plural.', exp: 'foot → feet.' },
        { q: 'Which word is a <strong>collective noun</strong>?', ans: 'A flock of birds', wrong: ['A brown bird', 'The bird flew', 'Bird'], hint: 'It names a group.', exp: '"Flock" names a group of birds.' },
        { q: 'The <strong>feminine</strong> gender of "king" is...', ans: 'queen', wrong: ['prince', 'kingess', 'lady'], hint: 'Royal female.', exp: 'king → queen.' },
        { q: 'The <strong>masculine</strong> gender of "cow" is...', ans: 'bull', wrong: ['calf', 'ox only', 'buffalo'], hint: 'The male of the cattle family.', exp: 'cow → bull.' },
        { q: 'Which of these is an <strong>uncountable</strong> noun?', ans: 'rice', wrong: ['apple', 'chair', 'pencil'], hint: 'You cannot say "two rices".', exp: 'Rice is measured, not counted one by one.' },
        { q: 'Which is a <strong>proper noun</strong>?', ans: 'Mumbai', wrong: ['city', 'town', 'village'], hint: 'It names one particular place.', exp: 'Mumbai is a specific city — a proper noun.' }
    ]);

    /* --- Articles & prepositions ------------------------------------ */
    const ARTICLE_ITEMS = [
        { phrase: '___ umbrella', ans: 'An' },
        { phrase: '___ banana', ans: 'A' },
        { phrase: '___ honest child', ans: 'An' },
        { phrase: '___ owl', ans: 'An' },
        { phrase: '___ elephant', ans: 'An' },
        { phrase: '___ university', ans: 'A' },
        { phrase: '___ hour', ans: 'An' },
        { phrase: '___ table', ans: 'A' },
        { phrase: '___ orange', ans: 'An' },
        { phrase: '___ uniform', ans: 'A' }
    ];

    const PREP_ITEMS = [
        { sent: 'The cat is sleeping ___ the table.', ans: 'under' },
        { sent: 'The bird is flying ___ the clouds.', ans: 'above' },
        { sent: 'Put the books ___ your school bag.', ans: 'in' },
        { sent: 'The cup is ___ the table.', ans: 'on' },
        { sent: 'The school is ___ the temple and the park.', ans: 'between' },
        { sent: 'Riya sat ___ her mother.', ans: 'beside' },
        { sent: 'The ball rolled ___ the bed.', ans: 'behind' }
    ];

    const eng_articles_prep_proc = () => {
        if (Math.random() > 0.5) {
            const item = pick(ARTICLE_ITEMS);
            return buildQuestion({
                topic: 'eng_articles_prep',
                badge: 'Santoor: Articles (a / an)',
                q: 'Choose the correct article:<br><em><strong>"' + item.phrase + '"</strong></em>',
                ans: item.ans,
                wrong: ['A', 'An', 'The', 'Some'],
                hint: 'Use "an" before a vowel SOUND, not just a vowel letter (an hour, a university).',
                exp: 'The correct article here is <strong>' + item.ans + '</strong>.'
            });
        }
        const item = pick(PREP_ITEMS);
        return buildQuestion({
            topic: 'eng_articles_prep',
            badge: 'Santoor: Prepositions of Place',
            q: 'Fill in the correct preposition of place:<br><em>"' + item.sent + '"</em>',
            ans: item.ans,
            wrong: ['under', 'above', 'in', 'on', 'between', 'beside', 'behind'].filter((p) => p !== item.ans),
            hint: 'Prepositions of place tell WHERE something is.',
            exp: '"' + item.ans + '" correctly shows the position.'
        });
    };

    /* --- Question words, conjunctions, pronouns ---------------------- */
    const eng_interrog_bank = bankGenerator('eng_interrogatives_conj_pronouns', 'Echoes: Question Words & Pronouns', [
        { q: 'Fill in: "___ is your class teacher?"', ans: 'Who', wrong: ['Where', 'When', 'Why'], hint: 'We use it to ask about a person.', exp: '"Who" asks about a person.' },
        { q: 'Fill in: "___ do you live?"', ans: 'Where', wrong: ['Who', 'When', 'What'], hint: 'We use it to ask about a place.', exp: '"Where" asks about a place.' },
        { q: 'Fill in: "___ is your birthday?"', ans: 'When', wrong: ['Who', 'Where', 'Which'], hint: 'We use it to ask about time.', exp: '"When" asks about time.' },
        { q: 'Fill in: "___ are you crying?"', ans: 'Why', wrong: ['Who', 'Where', 'Whose'], hint: 'We use it to ask for a reason.', exp: '"Why" asks for a reason.' },
        { q: 'Fill in: "___ book is this?" (asking about the owner)', ans: 'Whose', wrong: ['Who', 'Which', 'What'], hint: 'It asks about ownership.', exp: '"Whose" asks who something belongs to.' },
        { q: 'Fill in: "Rahul was hungry, ___ he ate a sandwich."', ans: 'so', wrong: ['but', 'or', 'because'], hint: 'It shows a result.', exp: '"so" joins a cause to its result.' },
        { q: 'Fill in: "I like mangoes ___ I do not like papaya."', ans: 'but', wrong: ['so', 'and', 'because'], hint: 'It shows a contrast.', exp: '"but" shows contrast between two ideas.' },
        { q: 'Fill in: "Riya is smart. ___ loves to read books."', ans: 'She', wrong: ['He', 'They', 'It'], hint: 'Riya is one girl.', exp: '"She" replaces a singular female noun.' },
        { q: 'Which pronoun replaces "Ravi and I"?', ans: 'We', wrong: ['They', 'He', 'You'], hint: 'It includes the speaker.', exp: '"Ravi and I" = "We".' },
        { q: 'Which pronoun replaces "the book"?', ans: 'It', wrong: ['He', 'She', 'They'], hint: 'A thing, not a person.', exp: 'Things are replaced by "it".' },
        { q: 'Fill in: "We stayed at home ___ it was raining."', ans: 'because', wrong: ['but', 'or', 'so'], hint: 'It gives a reason.', exp: '"because" introduces the reason.' },
        { q: 'Fill in: "Would you like tea ___ coffee?"', ans: 'or', wrong: ['and', 'but', 'so'], hint: 'It gives a choice.', exp: '"or" offers a choice between two options.' }
    ]);

    /* --- Reading comprehension -------------------------------------- */
    const PASSAGES = [
        {
            text: 'Meena lives in a small village near the river Ganga. Every morning she walks to school with her friend Anu. On the way they see peacocks dancing in the fields. Meena loves science the most, but Anu likes drawing.',
            items: [
                { q: 'Where does Meena live?', ans: 'In a small village near the river Ganga', wrong: ['In a big city', 'Near the sea', 'In the mountains'] },
                { q: 'Who does Meena walk to school with?', ans: 'Anu', wrong: ['Her brother', 'Her mother', 'Alone'] },
                { q: 'Which subject does Meena like the most?', ans: 'Science', wrong: ['Drawing', 'Maths', 'English'] },
                { q: 'What do the girls see on the way to school?', ans: 'Peacocks dancing in the fields', wrong: ['Elephants bathing', 'Boats on the river', 'A circus'] }
            ]
        },
        {
            text: 'The banyan tree in our school ground is very old. Its long roots hang down from the branches like ropes. Many sparrows and squirrels live in it. In summer the whole class sits under its cool shade to eat lunch.',
            items: [
                { q: 'What hangs down from the banyan tree\'s branches?', ans: 'Long roots like ropes', wrong: ['Flowers', 'Ripe fruits', 'Coloured ribbons'] },
                { q: 'Which animals live in the banyan tree?', ans: 'Sparrows and squirrels', wrong: ['Monkeys and parrots', 'Crows and cats', 'Rabbits and mice'] },
                { q: 'Why does the class sit under the tree in summer?', ans: 'Because of its cool shade', wrong: ['To pluck fruits', 'To water the tree', 'To play cricket'] }
            ]
        },
        {
            text: 'One hot afternoon a thirsty crow found a pot with very little water in it. He could not reach the water. He saw some pebbles nearby. One by one, he dropped the pebbles into the pot. Slowly the water rose up and the clever crow drank it happily.',
            items: [
                { q: 'What did the crow find?', ans: 'A pot with very little water', wrong: ['A full glass of juice', 'A river', 'A well'] },
                { q: 'What did the crow drop into the pot?', ans: 'Pebbles', wrong: ['Leaves', 'Sticks', 'Sand'] },
                { q: 'Why did the water rise in the pot?', ans: 'Because the pebbles took up space at the bottom', wrong: ['Because it rained', 'Because the crow blew air', 'Because the pot was tilted'] },
                { q: 'What lesson does this story teach?', ans: 'Thinking cleverly solves problems', wrong: ['Never drink water', 'Crows are lazy', 'Always ask for help'] }
            ]
        }
    ];

    const eng_comprehension_proc = () => {
        const p = pick(PASSAGES);
        const item = pick(p.items);
        return buildQuestion({
            topic: 'eng_comprehension',
            badge: 'Echoes: Reading Comprehension',
            q: '<div class="bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium text-slate-700 mb-3 italic">' + p.text + '</div>' + item.q,
            ans: item.ans,
            wrong: item.wrong,
            hint: 'Read the passage once more and find the exact line that answers the question.',
            exp: 'The passage tells us: <strong>' + item.ans + '</strong>.'
        });
    };

    /* --- Spellings & one-word answers -------------------------------- */
    const eng_spelling_bank = bankGenerator('eng_spelling', 'Santoor: Spelling & Vocabulary', [
        { q: 'Choose the <strong>correctly spelt</strong> word.', ans: 'beautiful', wrong: ['beutiful', 'beautifull', 'beautifal'], hint: 'be-au-ti-ful', exp: 'The correct spelling is "beautiful".' },
        { q: 'Choose the <strong>correctly spelt</strong> word.', ans: 'because', wrong: ['becuase', 'becouse', 'becaus'], hint: 'be-cause', exp: 'The correct spelling is "because".' },
        { q: 'Choose the <strong>correctly spelt</strong> word.', ans: 'friend', wrong: ['freind', 'frend', 'friende'], hint: 'i before e in "friend".', exp: 'The correct spelling is "friend".' },
        { q: 'Choose the <strong>correctly spelt</strong> word.', ans: 'February', wrong: ['Febuary', 'Februery', 'Feburary'], hint: 'There is an "r" after "Feb".', exp: 'The correct spelling is "February".' },
        { q: 'Choose the <strong>correctly spelt</strong> word.', ans: 'vegetable', wrong: ['vegitable', 'vegetible', 'vegtable'], hint: 've-ge-ta-ble', exp: 'The correct spelling is "vegetable".' },
        { q: 'A person who teaches is called a...', ans: 'Teacher', wrong: ['Doctor', 'Farmer', 'Driver'], hint: 'Think about school.', exp: 'A teacher teaches.' },
        { q: 'A place where books are kept for reading is a...', ans: 'Library', wrong: ['Laboratory', 'Bakery', 'Gallery'], hint: 'You borrow books from here.', exp: 'A library keeps books.' },
        { q: 'A person who grows crops is called a...', ans: 'Farmer', wrong: ['Baker', 'Tailor', 'Barber'], hint: 'They work in fields.', exp: 'A farmer grows crops.' },
        { q: 'The young one of a <strong>cat</strong> is called a...', ans: 'Kitten', wrong: ['Cub', 'Puppy', 'Calf'], hint: 'Small and furry.', exp: 'A baby cat is a kitten.' },
        { q: 'The young one of a <strong>cow</strong> is called a...', ans: 'Calf', wrong: ['Kid', 'Foal', 'Lamb'], hint: 'It stays with the herd.', exp: 'A baby cow is a calf.' },
        { q: 'A lion makes which sound?', ans: 'Roars', wrong: ['Barks', 'Chirps', 'Neighs'], hint: 'King of the jungle.', exp: 'Lions roar.' },
        { q: 'A group of sheep is called a...', ans: 'Flock', wrong: ['Herd', 'Swarm', 'Bunch'], hint: 'Also used for birds.', exp: 'A flock of sheep.' },
        { q: 'The opposite of "ancient" is...', ans: 'modern', wrong: ['old', 'antique', 'aged'], hint: 'Think new.', exp: 'ancient ↔ modern.' }
    ]);

    /* --- Sentence making --------------------------------------------- */
    const eng_sentence_bank = bankGenerator('eng_sentence', 'Echoes: Sentence Building', [
        { q: 'Rearrange into a correct sentence: <em>garden / the / in / plays / Riya</em>', ans: 'Riya plays in the garden.', wrong: ['Plays Riya in the garden.', 'In the garden Riya plays?', 'Garden Riya the in plays.'], hint: 'Start with who is doing the action.', exp: 'Subject + verb + rest: "Riya plays in the garden."' },
        { q: 'Rearrange: <em>school / to / goes / He / daily</em>', ans: 'He goes to school daily.', wrong: ['Goes he to school daily.', 'Daily school he goes to.', 'To school daily he goes?'], hint: 'Subject comes first.', exp: '"He goes to school daily." is correct.' },
        { q: 'Which group of words is a <strong>complete sentence</strong>?', ans: 'The dog barked loudly.', wrong: ['The barking dog', 'Loudly in the night', 'Running very fast'], hint: 'A sentence needs a subject and a verb, and gives a full meaning.', exp: '"The dog barked loudly." has a subject and a verb.' },
        { q: 'Which sentence gives an <strong>order or command</strong>?', ans: 'Close the door, please.', wrong: ['Is the door closed?', 'The door is closed.', 'What a big door!'], hint: 'It tells someone to do something.', exp: 'Imperative sentences give commands or requests.' },
        { q: 'Which sentence <strong>asks</strong> something?', ans: 'Have you finished your homework?', wrong: ['I finished my homework.', 'Finish your homework.', 'What a lot of homework!'], hint: 'It ends with a question mark.', exp: 'Interrogative sentences ask questions.' },
        { q: 'Which sentence shows <strong>strong feeling</strong>?', ans: 'What a beautiful rainbow!', wrong: ['The rainbow is beautiful.', 'Is the rainbow beautiful?', 'Look at the rainbow.'], hint: 'It ends with an exclamation mark.', exp: 'Exclamatory sentences show sudden strong feelings.' },
        { q: 'Choose the sentence with the correct <strong>subject-verb</strong> match.', ans: 'The birds are singing.', wrong: ['The birds is singing.', 'The bird are singing.', 'The birds am singing.'], hint: 'Plural subject takes "are".', exp: '"Birds" is plural, so it takes "are".' }
    ]);

    const englishGenerators = {
        eng_word_meanings: eng_word_meanings_proc,
        eng_synonym_antonym: eng_synonym_antonym_proc,
        eng_compound_rhyme: eng_compound_rhyme_proc,
        eng_syllables_silent: eng_syllables_silent_proc,
        eng_adjectives_adverbs: eng_adjectives_adverbs_bank,
        eng_degrees_comp: eng_degrees_comp_proc,
        eng_alphabetical_comma: eng_alphabetical_comma_bank,
        eng_be_verbs: eng_be_verbs_proc,
        eng_verbs_tenses: mix(eng_verbs_tenses_proc, eng_verbs_tenses_bank),
        eng_nouns: mix(eng_nouns_proc, eng_nouns_bank),
        eng_articles_prep: eng_articles_prep_proc,
        eng_interrogatives_conj_pronouns: eng_interrog_bank,
        eng_comprehension: eng_comprehension_proc,
        eng_spelling: eng_spelling_bank,
        eng_sentence: eng_sentence_bank
    };

    /* ===============================================================
     * Extra practice-paper questions
     * Modelled on Santoor / Echoes exercises and common Class 3
     * English worksheet and exam patterns.
     * =============================================================== */
    const PAPER = {
        eng_word_meanings: [
            { q: 'What does <strong>"drenched"</strong> mean?<br><em>"The children were drenched in the heavy rain."</em>', ans: 'completely wet', wrong: ['very dry', 'very happy', 'very tired'], hint: 'Think about being out in heavy rain.', exp: 'Drenched means soaked through — completely wet.' },
            { q: 'What does <strong>"tiny"</strong> mean?', ans: 'very small', wrong: ['very big', 'very fast', 'very loud'], hint: 'Opposite of huge.', exp: 'Tiny means very small.' },
            { q: 'What does <strong>"peep"</strong> mean?<br><em>"She peeped through the window."</em>', ans: 'to look quickly and secretly', wrong: ['to shout loudly', 'to run fast', 'to sleep'], hint: 'A quick little look.', exp: 'To peep is to take a quick, secret look.' },
            { q: 'What does <strong>"gigantic"</strong> mean?', ans: 'extremely large', wrong: ['extremely small', 'extremely tasty', 'extremely quiet'], hint: 'Think of a giant.', exp: 'Gigantic means enormous, like a giant.' },
            { q: 'What does <strong>"chuckle"</strong> mean?', ans: 'to laugh softly', wrong: ['to cry loudly', 'to run away', 'to eat quickly'], hint: 'A quiet little laugh.', exp: 'A chuckle is a quiet laugh.' },
            { q: 'What does <strong>"scurry"</strong> mean?<br><em>"The mouse scurried into its hole."</em>', ans: 'to move with quick short steps', wrong: ['to sleep deeply', 'to sing loudly', 'to sit still'], hint: 'How does a mouse move when scared?', exp: 'To scurry is to hurry with short quick steps.' },
            { q: 'What does <strong>"grateful"</strong> mean?', ans: 'thankful', wrong: ['angry', 'sleepy', 'hungry'], hint: 'What you feel when someone helps you.', exp: 'Grateful means feeling thankful.' }
        ],
        eng_synonym_antonym: [
            { q: 'Choose the <strong>opposite</strong> of "always".', ans: 'never', wrong: ['often', 'sometimes', 'daily'], hint: 'Think of the complete opposite.', exp: 'always ↔ never.' },
            { q: 'Choose the <strong>opposite</strong> of "remember".', ans: 'forget', wrong: ['recall', 'think', 'know'], hint: 'What happens when it leaves your mind?', exp: 'remember ↔ forget.' },
            { q: 'Choose the <strong>same meaning</strong> as "jump".', ans: 'leap', wrong: ['crawl', 'sit', 'sleep'], hint: 'Both mean to spring up.', exp: 'jump = leap.' },
            { q: 'Choose the <strong>same meaning</strong> as "big".', ans: 'large', wrong: ['small', 'thin', 'short'], hint: 'Another word for big.', exp: 'big = large.' },
            { q: 'Choose the <strong>opposite</strong> of "above".', ans: 'below', wrong: ['over', 'upon', 'near'], hint: 'Up and down.', exp: 'above ↔ below.' },
            { q: 'Choose the <strong>opposite</strong> of "first".', ans: 'last', wrong: ['second', 'next', 'early'], hint: 'The very end.', exp: 'first ↔ last.' },
            { q: 'Choose the <strong>same meaning</strong> as "shut".', ans: 'close', wrong: ['open', 'break', 'push'], hint: 'Shut the door = ? the door.', exp: 'shut = close.' }
        ],
        eng_compound_rhyme: [
            { q: 'Which is a <strong>compound word</strong>?', ans: 'Bookshelf', wrong: ['Reading', 'Quickly', 'Beautiful'], hint: 'Two small words joined together.', exp: 'Book + shelf = bookshelf.' },
            { q: 'Break the compound word <strong>"Sunrise"</strong>.', ans: 'Sun + rise', wrong: ['Su + nrise', 'Sunr + ise', 'S + unrise'], hint: 'Two real words.', exp: 'Sunrise = sun + rise.' },
            { q: 'Which word rhymes with <strong>"star"</strong>?', ans: 'Car', wrong: ['Sun', 'Moon', 'Sky'], hint: 'Same ending sound "-ar".', exp: 'star and car rhyme.' },
            { q: 'Which word rhymes with <strong>"blue"</strong>?', ans: 'Shoe', wrong: ['Red', 'Green', 'Black'], hint: 'Same ending sound "-oo".', exp: 'blue and shoe rhyme.' },
            { q: 'Join: <strong>"Butter" + "milk"</strong>', ans: 'Buttermilk', wrong: ['Butterly', 'Milkbutter', 'Butteries'], hint: 'Put them together, no space.', exp: 'Butter + milk = buttermilk.' },
            { q: 'Which pair does <strong>not</strong> rhyme?', ans: 'Cat and Dog', wrong: ['Cat and Bat', 'Dog and Log', 'Hen and Pen'], hint: 'Listen to the ending sounds.', exp: 'Cat and dog have different ending sounds.' }
        ],
        eng_syllables_silent: [
            { q: 'How many syllables in <strong>"computer"</strong>?', ans: 3, wrong: [2, 4, 1], hint: 'com-pu-ter', exp: 'com-pu-ter = 3 syllables.' },
            { q: 'How many syllables in <strong>"happy"</strong>?', ans: 2, wrong: [1, 3, 4], hint: 'hap-py', exp: 'hap-py = 2 syllables.' },
            { q: 'Which letter is silent in <strong>"know"</strong>?', ans: 'K', wrong: ['N', 'O', 'W'], hint: 'It sounds like "no".', exp: 'The K in know is silent.' },
            { q: 'Which letter is silent in <strong>"thumb"</strong>?', ans: 'B', wrong: ['T', 'H', 'M'], hint: 'It sounds like "thum".', exp: 'The B in thumb is silent.' },
            { q: 'Which letter is silent in <strong>"scissors"</strong>?', ans: 'C', wrong: ['S', 'I', 'R'], hint: 'It sounds like "sizzors".', exp: 'The first C in scissors is silent.' },
            { q: 'How many syllables in <strong>"crocodile"</strong>?', ans: 3, wrong: [2, 4, 5], hint: 'croc-o-dile', exp: 'croc-o-dile = 3 syllables.' }
        ],
        eng_adjectives_adverbs: [
            { q: 'Pick the adjective: "The <u>juicy</u> mango tasted sweet."', ans: 'juicy', wrong: ['tasted', 'sweet mango', 'the'], hint: 'It describes the mango.', exp: '"juicy" describes the noun "mango".' },
            { q: 'Complete with an adverb: "The lion roared ___."', ans: 'loudly', wrong: ['loud', 'loudness', 'louder'], hint: 'Adverbs of manner end in -ly.', exp: '"loudly" tells how the lion roared.' },
            { q: 'Which word tells us <strong>how many</strong>?', ans: 'Seven', wrong: ['Green', 'Softly', 'Under'], hint: 'It is a number.', exp: '"Seven" is an adjective of number.' },
            { q: 'Change <strong>"quick"</strong> into an adverb.', ans: 'quickly', wrong: ['quicker', 'quickness', 'quickest'], hint: 'Add -ly.', exp: 'quick → quickly.' },
            { q: 'Pick the adverb: "She sings <u>beautifully</u>."', ans: 'beautifully', wrong: ['sings', 'she', 'beautiful'], hint: 'It tells HOW she sings.', exp: '"beautifully" is an adverb of manner.' },
            { q: 'Which sentence is correct?', ans: 'He runs fast.', wrong: ['He runs fastly.', 'He run fast.', 'He running fast.'], hint: '"fast" is already an adverb.', exp: '"fast" does not take -ly.' }
        ],
        eng_degrees_comp: [
            { q: 'Complete: good → better → ___', ans: 'best', wrong: ['goodest', 'gooder', 'more good'], hint: 'This one is irregular.', exp: 'good → better → best.' },
            { q: 'Complete: bad → worse → ___', ans: 'worst', wrong: ['baddest', 'badder', 'more bad'], hint: 'Also irregular.', exp: 'bad → worse → worst.' },
            { q: 'Complete: beautiful → ___ → most beautiful', ans: 'more beautiful', wrong: ['beautifuller', 'beautifulest', 'beautifully'], hint: 'Long words use "more".', exp: 'Long adjectives use more / most.' },
            { q: 'Fill in: "Ravi is the ___ boy in the class." (tall)', ans: 'tallest', wrong: ['taller', 'tall', 'more tall'], hint: '"the ___ in the class" compares many.', exp: 'Comparing three or more uses the superlative: tallest.' },
            { q: 'Fill in: "This box is ___ than that one." (heavy)', ans: 'heavier', wrong: ['heaviest', 'heavy', 'more heavy'], hint: '"than" signals the comparative.', exp: 'heavy → heavier (y becomes i).' }
        ],
        eng_alphabetical_comma: [
            { q: 'Which word comes <strong>last</strong> in a dictionary?', ans: 'Zebra', wrong: ['Apple', 'Mango', 'Tiger'], hint: 'Z is the last letter.', exp: 'Zebra starts with Z.' },
            { q: 'Arrange: sun, sand, seed. Which comes first?', ans: 'sand', wrong: ['sun', 'seed', 'All same'], hint: 'All start with "s" — compare the second letter.', exp: 'sa < se < su, so sand is first.' },
            { q: 'Where does the full stop go?<br><em>"I love my school"</em>', ans: 'I love my school.', wrong: ['I love. my school', 'I. love my school', 'I love my. school'], hint: 'A full stop ends a sentence.', exp: 'The full stop goes at the very end.' },
            { q: 'Which sentence needs a <strong>question mark</strong>?', ans: 'What is your name', wrong: ['My name is Riya', 'I am eight years old', 'She likes mangoes'], hint: 'Which one asks something?', exp: '"What is your name?" is a question.' },
            { q: 'Choose the correct sentence.', ans: 'We visited Agra in April.', wrong: ['we visited agra in april.', 'We Visited Agra In April.', 'we Visited agra in April'], hint: 'Capitals for the first word, places and months.', exp: 'Only "We", "Agra" and "April" need capitals.' }
        ],
        eng_be_verbs: [
            { q: 'Fill in: "The books ___ on the table."', ans: 'are', wrong: ['is', 'am', 'was'], hint: '"Books" is plural and it is happening now.', exp: 'Plural subject in the present takes "are".' },
            { q: 'Fill in: "I ___ eight years old."', ans: 'am', wrong: ['is', 'are', 'were'], hint: '"I" always takes one special form.', exp: '"I am" is always correct.' },
            { q: 'Fill in: "He ___ in the garden yesterday."', ans: 'was', wrong: ['is', 'were', 'am'], hint: '"Yesterday" means past, and "he" is singular.', exp: 'Singular subject + past = "was".' },
            { q: 'Fill in: "They ___ very happy last night."', ans: 'were', wrong: ['was', 'are', 'is'], hint: 'Plural subject + past.', exp: 'Plural + past = "were".' },
            { q: 'Fill in: "It ___ raining now."', ans: 'is', wrong: ['are', 'am', 'were'], hint: '"It" is singular and it is now.', exp: 'Singular + present = "is".' }
        ],
        eng_verbs_tenses: [
            { q: 'Past tense of <strong>"come"</strong>?', ans: 'came', wrong: ['comed', 'coming', 'comes'], hint: 'Irregular verb.', exp: 'come → came.' },
            { q: 'Past tense of <strong>"sing"</strong>?', ans: 'sang', wrong: ['singed', 'singing', 'sung yesterday'], hint: 'Irregular verb.', exp: 'sing → sang.' },
            { q: 'Past tense of <strong>"study"</strong>?', ans: 'studied', wrong: ['studyed', 'studying', 'studies'], hint: 'Change y to i, add -ed.', exp: 'study → studied.' },
            { q: 'Fill in: "Every day she ___ to school." ', ans: 'walks', wrong: ['walk', 'walked', 'walking'], hint: '"Every day" + she = simple present with -s.', exp: 'She walks to school every day.' },
            { q: 'Fill in: "Right now the baby ___ ." (sleep)', ans: 'is sleeping', wrong: ['slept', 'sleeps', 'will sleep'], hint: '"Right now" means present continuous.', exp: 'is + verb-ing = present continuous.' },
            { q: 'Which sentence is in the <strong>past</strong> tense?', ans: 'We played cricket.', wrong: ['We play cricket.', 'We are playing cricket.', 'We will play cricket.'], hint: 'Look for the -ed ending.', exp: '"played" shows past tense.' },
            { q: 'The -ing form of <strong>"run"</strong> is...', ans: 'running', wrong: ['runing', 'runned', 'runs'], hint: 'Double the last letter.', exp: 'run → running.' }
        ],
        eng_nouns: [
            { q: 'Plural of <strong>"tomato"</strong>?', ans: 'tomatoes', wrong: ['tomatos', 'tomatoies', 'tomato'], hint: 'Add -es after o.', exp: 'tomato → tomatoes.' },
            { q: 'Plural of <strong>"bus"</strong>?', ans: 'buses', wrong: ['buss', 'busies', 'bus'], hint: 'Words ending in s take -es.', exp: 'bus → buses.' },
            { q: 'Plural of <strong>"tooth"</strong>?', ans: 'teeth', wrong: ['tooths', 'toothes', 'tooths\'s'], hint: 'Irregular plural.', exp: 'tooth → teeth.' },
            { q: 'Plural of <strong>"story"</strong>?', ans: 'stories', wrong: ['storys', 'storyes', 'storie'], hint: 'Change y to i, add -es.', exp: 'story → stories.' },
            { q: 'Which is a <strong>proper noun</strong>?', ans: 'Diwali', wrong: ['festival', 'sweets', 'lamp'], hint: 'It names one particular thing and takes a capital.', exp: 'Diwali is a proper noun.' },
            { q: 'The feminine of <strong>"lion"</strong> is...', ans: 'lioness', wrong: ['cub', 'tigress', 'leopard'], hint: 'Add -ess.', exp: 'lion → lioness.' },
            { q: 'A group of <strong>cows</strong> is called a...', ans: 'herd', wrong: ['flock', 'swarm', 'bunch'], hint: 'Used for cattle.', exp: 'A herd of cows.' },
            { q: 'A group of <strong>bees</strong> is called a...', ans: 'swarm', wrong: ['herd', 'flock', 'pack'], hint: 'They fly together in a mass.', exp: 'A swarm of bees.' }
        ],
        eng_articles_prep: [
            { q: 'Choose: "___ apple a day keeps the doctor away."', ans: 'An', wrong: ['A', 'The', 'Some'], hint: '"apple" starts with a vowel sound.', exp: 'Use "an" before a vowel sound.' },
            { q: 'Choose: "She is ___ honest girl."', ans: 'an', wrong: ['a', 'the', 'some'], hint: 'The "h" in honest is silent.', exp: '"honest" starts with a vowel sound, so "an".' },
            { q: 'Fill in the preposition: "The bird sat ___ the branch."', ans: 'on', wrong: ['in', 'under', 'between'], hint: 'It is resting on top of it.', exp: '"on" shows something resting on a surface.' },
            { q: 'Fill in: "The ball is ___ the two chairs."', ans: 'between', wrong: ['on', 'above', 'in'], hint: 'It is in the middle of two things.', exp: '"between" is used for two things.' },
            { q: 'Fill in: "The fish swims ___ the water."', ans: 'in', wrong: ['on', 'above', 'behind'], hint: 'It is inside the water.', exp: '"in" shows something inside.' },
            { q: 'Fill in: "We reached school ___ 8 o\'clock."', ans: 'at', wrong: ['in', 'on', 'under'], hint: 'Used with an exact time.', exp: 'We use "at" with clock times.' }
        ],
        eng_interrogatives_conj_pronouns: [
            { q: 'Fill in: "___ many books do you have?"', ans: 'How', wrong: ['What', 'Who', 'Where'], hint: 'Used to ask about quantity.', exp: '"How many" asks about number.' },
            { q: 'Fill in: "___ colour do you like?"', ans: 'Which', wrong: ['Who', 'When', 'Why'], hint: 'Choosing from options.', exp: '"Which" asks you to choose.' },
            { q: 'Which pronoun replaces "the girls"?', ans: 'They', wrong: ['She', 'He', 'It'], hint: 'More than one person.', exp: 'Plural people become "they".' },
            { q: 'Fill in: "I was tired, ___ I went to bed early."', ans: 'so', wrong: ['but', 'or', 'although'], hint: 'It shows the result.', exp: '"so" joins a cause to its result.' },
            { q: 'Fill in: "Rina ___ Sita are best friends."', ans: 'and', wrong: ['but', 'or', 'so'], hint: 'It joins two things together.', exp: '"and" joins two nouns.' },
            { q: 'Which pronoun replaces "my brother"?', ans: 'He', wrong: ['She', 'It', 'They'], hint: 'One boy.', exp: 'A single male becomes "he".' }
        ],
        eng_spelling: [
            { q: 'Choose the correct spelling.', ans: 'birthday', wrong: ['brithday', 'birthdey', 'birthdy'], hint: 'birth + day', exp: 'The correct spelling is "birthday".' },
            { q: 'Choose the correct spelling.', ans: 'elephant', wrong: ['elephent', 'eliphant', 'elefant'], hint: 'el-e-phant', exp: 'The correct spelling is "elephant".' },
            { q: 'Choose the correct spelling.', ans: 'chocolate', wrong: ['choclate', 'chocolet', 'chocalate'], hint: 'choc-o-late', exp: 'The correct spelling is "chocolate".' },
            { q: 'Choose the correct spelling.', ans: 'garden', wrong: ['gardin', 'gerden', 'gardan'], hint: 'gar-den', exp: 'The correct spelling is "garden".' },
            { q: 'A place where we buy medicines is a...', ans: 'Chemist / Pharmacy', wrong: ['Bakery', 'Library', 'Grocery'], hint: 'The doctor gives a prescription for it.', exp: 'Medicines are sold at a chemist or pharmacy.' },
            { q: 'A doctor who treats animals is called a...', ans: 'Veterinarian', wrong: ['Dentist', 'Engineer', 'Pilot'], hint: 'A vet.', exp: 'A veterinarian (vet) treats animals.' },
            { q: 'The young one of a <strong>dog</strong> is a...', ans: 'Puppy', wrong: ['Kitten', 'Calf', 'Cub'], hint: 'Small and playful.', exp: 'A baby dog is a puppy.' },
            { q: 'An <strong>elephant</strong> makes which sound?', ans: 'Trumpets', wrong: ['Barks', 'Moos', 'Neighs'], hint: 'Like a trumpet through its trunk.', exp: 'Elephants trumpet.' },
            { q: 'Which word means "a house for a bird"?', ans: 'Nest', wrong: ['Kennel', 'Stable', 'Burrow'], hint: 'Made of twigs in a tree.', exp: 'Birds live in nests.' },
            { q: 'A horse lives in a...', ans: 'Stable', wrong: ['Nest', 'Den', 'Web'], hint: 'A building on a farm.', exp: 'Horses live in stables.' }
        ],
        eng_sentence: [
            { q: 'Rearrange: <em>is / This / my / book</em>', ans: 'This is my book.', wrong: ['Is this my book.', 'My book this is.', 'Book my is this.'], hint: 'Start with "This".', exp: '"This is my book." is correct.' },
            { q: 'Rearrange: <em>the / cat / mat / on / sat / the</em>', ans: 'The cat sat on the mat.', wrong: ['Cat the sat the on mat.', 'On the mat the cat sat?', 'Sat the cat on mat the.'], hint: 'Who did what, then where.', exp: '"The cat sat on the mat." is correct.' },
            { q: 'Which is <strong>not</strong> a complete sentence?', ans: 'Under the big tree', wrong: ['Birds sing.', 'She is happy.', 'We played.'], hint: 'A sentence needs a subject and a verb.', exp: '"Under the big tree" has no subject or verb.' },
            { q: 'Which sentence is a <strong>request</strong>?', ans: 'Please pass me the water.', wrong: ['I passed the water.', 'Did you pass the water?', 'What lovely water!'], hint: 'It uses "please".', exp: 'Requests politely ask someone to do something.' },
            { q: 'Choose the correct sentence.', ans: 'There are five apples.', wrong: ['There is five apples.', 'There am five apples.', 'There be five apples.'], hint: 'Five apples is plural.', exp: 'Plural subject takes "are".' },
            { q: 'Choose the correct sentence.', ans: 'My mother cooks tasty food.', wrong: ['My mother cook tasty food.', 'My mother cooking tasty food.', 'My mother cooked tasty food yesterday every day.'], hint: 'Singular subject in simple present takes -s.', exp: '"cooks" matches "my mother".' }
        ]
    };

    const EXAM_PAPER = {
        eng_word_meanings: [
            { q: 'What does <strong>"enormous"</strong> mean?', ans: 'very large', wrong: ['very small', 'very quiet', 'very slow'], hint: 'Think of something much bigger than usual.', exp: 'Enormous means very large.' }
        ],
        eng_synonym_antonym: [
            { q: 'Choose the opposite of <strong>"empty"</strong>.', ans: 'full', wrong: ['open', 'light', 'clean'], hint: 'An empty glass has nothing in it.', exp: 'The opposite of empty is full.' }
        ],
        eng_compound_rhyme: [
            { q: 'Which word rhymes with <strong>"light"</strong>?', ans: 'kite', wrong: ['late', 'let', 'lot'], hint: 'Listen to the ending sound.', exp: 'Light and kite end with the same sound.' }
        ],
        eng_syllables_silent: [
            { q: 'How many syllables are in <strong>"banana"</strong>?', ans: 3, wrong: [2, 4, 5], hint: 'Say it slowly: ba-na-na.', exp: 'Ba-na-na has 3 syllables.' }
        ],
        eng_adjectives_adverbs: [
            { q: 'Pick the adjective: <strong>"The bright sun shone."</strong>', ans: 'bright', wrong: ['sun', 'shone', 'the'], hint: 'It describes the sun.', exp: 'Bright describes the noun sun, so it is an adjective.' }
        ],
        eng_degrees_comp: [
            { q: 'Complete: small → smaller → ___.', ans: 'smallest', wrong: ['more small', 'smalling', 'smallful'], hint: 'The last degree compares the most.', exp: 'The three forms are small, smaller and smallest.' }
        ],
        eng_alphabetical_comma: [
            { q: 'Arrange alphabetically: <strong>ball, apple, cat</strong>.', ans: 'apple, ball, cat', wrong: ['ball, cat, apple', 'cat, ball, apple', 'apple, cat, ball'], hint: 'Compare the first letters.', exp: 'A comes before B, and B comes before C.' }
        ],
        eng_be_verbs: [
            { q: 'Fill in: <strong>"We ___ ready for the game."</strong>', ans: 'are', wrong: ['am', 'is', 'was'], hint: 'We is plural and the sentence is in the present.', exp: 'We takes are: We are ready.' }
        ],
        eng_verbs_tenses: [
            { q: 'Choose the past tense of <strong>"write"</strong>.', ans: 'wrote', wrong: [' writed', 'writing', 'writes'], hint: 'This is an irregular verb.', exp: 'The past tense of write is wrote.' }
        ],
        eng_nouns: [
            { q: 'Which is a <strong>common noun</strong>?', ans: 'river', wrong: ['Ganga', 'Riya', 'Monday'], hint: 'It names a general person, place or thing.', exp: 'River is a general name, so it is a common noun.' }
        ],
        eng_articles_prep: [
            { q: 'Fill in: <strong>"The cat is hiding ___ the table."</strong>', ans: 'under', wrong: ['on', 'at', 'between'], hint: 'It is below the table.', exp: 'Under shows that the cat is below the table.' }
        ],
        eng_interrogatives_conj_pronouns: [
            { q: 'Fill in: <strong>"___ are you crying?"</strong>', ans: 'Why', wrong: ['Who', 'Where', 'Which'], hint: 'Ask for a reason.', exp: 'Why asks for a reason.' }
        ],
        eng_sentence: [
            { q: 'Which sentence is written correctly?', ans: 'The birds are flying.', wrong: ['the birds are flying', 'The birds is flying.', 'The birds flying are.'], hint: 'Start with a capital and end with a full stop.', exp: 'The birds are flying. has the correct order and punctuation.' }
        ]
    };

    const PAPER_BADGES = {
        eng_word_meanings: 'Santoor: Word Meanings',
        eng_synonym_antonym: 'Santoor: Synonyms & Antonyms',
        eng_compound_rhyme: 'Santoor: Compound & Rhyming Words',
        eng_syllables_silent: 'Echoes: Syllables & Silent Letters',
        eng_adjectives_adverbs: 'Santoor: Adjectives & Adverbs',
        eng_degrees_comp: 'Santoor: Degrees of Comparison',
        eng_alphabetical_comma: 'Echoes: Order & Punctuation',
        eng_be_verbs: "Santoor: Forms of 'be'",
        eng_verbs_tenses: 'Santoor: Verbs & Tenses',
        eng_nouns: 'Santoor: Nouns & Plurals',
        eng_articles_prep: 'Santoor: Articles & Prepositions',
        eng_interrogatives_conj_pronouns: 'Echoes: Question Words & Pronouns',
        eng_comprehension: 'Echoes: Reading Comprehension',
        eng_spelling: 'Santoor: Spelling & Vocabulary',
        eng_sentence: 'Echoes: Sentence Building'
    };

    Object.keys(PAPER).forEach((key) => {
        const extra = bankGenerator(key, PAPER_BADGES[key] || 'English', PAPER[key]);
        englishGenerators[key] = englishGenerators[key] ? mix(englishGenerators[key], extra) : extra;
    });

    Object.keys(EXAM_PAPER).forEach((key) => {
        const extra = bankGenerator(key, PAPER_BADGES[key] || 'English Exam Practice', EXAM_PAPER[key]);
        englishGenerators[key] = englishGenerators[key] ? mix(englishGenerators[key], extra) : extra;
    });

    B.registerBook({
        subject: 'english',
        book: 'NCERT Santoor 3 + Echoes reader (Class 3)',
        generators: englishGenerators,
        topics: [
                { id: 'all', label: '🌟 All English Topics (Mixed Practice)' },
                { id: 'eng_word_meanings', label: 'Word Meanings in Context' },
                { id: 'eng_synonym_antonym', label: 'Synonyms & Antonyms' },
                { id: 'eng_compound_rhyme', label: 'Compound Words & Rhyming Words' },
                { id: 'eng_syllables_silent', label: 'Syllable Beats & Silent Letters' },
                { id: 'eng_adjectives_adverbs', label: 'Adjectives & Adverbs' },
                { id: 'eng_degrees_comp', label: 'Degrees of Comparison' },
                { id: 'eng_alphabetical_comma', label: 'Alphabetical Order & Punctuation' },
                { id: 'eng_be_verbs', label: "Forms of 'be' (am, is, are, was, were)" },
                { id: 'eng_verbs_tenses', label: 'Verbs & Tenses' },
                { id: 'eng_nouns', label: 'Nouns, Plurals & Gender' },
                { id: 'eng_articles_prep', label: 'Articles (a / an) & Prepositions' },
                { id: 'eng_interrogatives_conj_pronouns', label: 'Question Words, Conjunctions & Pronouns' },
                { id: 'eng_comprehension', label: 'Reading Comprehension Passages' },
                { id: 'eng_spelling', label: 'Spellings & One-Word Answers' },
                { id: 'eng_sentence', label: 'Sentence Building & Types' }
            ]
    });

})(typeof window !== 'undefined' ? window : globalThis);
