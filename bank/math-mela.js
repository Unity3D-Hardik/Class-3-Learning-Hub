/*
 * Class 3 Learning Hub - Mathematics question bank
 * ------------------------------------------------------------------
 * Book   : NCERT Math Mela (Class 3)
 * Subject: math
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
     * MATHEMATICS - NCERT "Math Mela" Class 3
     * =============================================================== */

    /* --- Ch 1: What's in a Name? ---------------------------------- */
    const NAME_WORDS = [
        'Aarav', 'Ananya', 'Kabir', 'Meera', 'Devansh', 'Ishita', 'Rudra', 'Saanvi',
        'Bhuvan', 'Tanisha', 'Yashika', 'Om', 'Advait', 'Nitya', 'Reyansh'
    ];

    const ch1_names_proc = () => {
        const name = pick(NAME_WORDS);
        const mode = pick(['letters', 'vowels', 'consonants', 'compare']);

        if (mode === 'compare') {
            const other = pick(NAME_WORDS.filter((n) => n.length !== name.length));
            const longer = name.length > other.length ? name : other;
            return buildQuestion({
                topic: 'ch1_names',
                badge: "Ch-1: What's in a Name?",
                q: 'Whose name is <strong>longer</strong> — <strong>' + name + '</strong> or <strong>' + other + '</strong>?',
                ans: longer,
                wrong: [name === longer ? other : name, 'Both are equal', 'Cannot be compared'],
                hint: 'Count the letters in each name and compare the two counts.',
                exp: name + ' has ' + name.length + ' letters and ' + other + ' has ' + other.length + ' letters, so <strong>' + longer + '</strong> is longer.'
            });
        }

        const vowels = (name.match(/[aeiouAEIOU]/g) || []).length;
        const letters = name.length;
        const consonants = letters - vowels;
        const map = {
            letters: { label: 'letters', value: letters },
            vowels: { label: 'vowels (a, e, i, o, u)', value: vowels },
            consonants: { label: 'consonants', value: consonants }
        };
        const target = map[mode];

        return buildQuestion({
            topic: 'ch1_names',
            badge: "Ch-1: What's in a Name?",
            q: 'How many <strong>' + target.label + '</strong> are there in the name <strong>' + name + '</strong>?',
            ans: target.value,
            wrong: [letters, vowels, consonants, target.value + 1],
            hint: 'Write the name letter by letter, then tick off the ones you need to count.',
            exp: name + ' has ' + letters + ' letters — ' + vowels + ' vowels and ' + consonants + ' consonants.'
        });
    };

    const ch1_names_bank = bankGenerator('ch1_names', "Ch-1: What's in a Name?", [
        { q: 'Which of these names has the <strong>most letters</strong>?', ans: 'Priyadarshini', wrong: ['Ravi', 'Sita', 'Manav'], hint: 'Count letters one by one.', exp: 'Priyadarshini has 13 letters — more than the others.' },
        { q: 'How many <strong>vowels</strong> are in the word <strong>MATHEMATICS</strong>?', ans: 4, wrong: [3, 5, 6], hint: 'The vowels are a, e, i, o, u.', exp: 'M-A-TH-E-M-A-T-I-CS → A, E, A, I = 4 vowels.' },
        { q: 'Two names are of the <strong>same length</strong>. Which pair is it?', ans: 'RAHUL and NEHAA', wrong: ['RAM and SITA', 'MEENA and OM', 'ANU and KABIR'], hint: 'Both names must have the same number of letters.', exp: 'RAHUL and NEHAA both have 5 letters.' },
        { q: 'If you write your name once every day for a week, how many times is it written?', ans: 7, wrong: [5, 6, 14], hint: 'A week has 7 days.', exp: '1 time each day × 7 days = 7 times.' },
        { q: 'The name <strong>ANITA</strong> is written using how many <strong>different</strong> letters?', ans: 4, wrong: [5, 3, 6], hint: 'The letter A repeats — count it only once.', exp: 'A, N, I, T (A repeats) = 4 different letters.' },
        { q: 'Arrange these names by length, shortest first. Which comes <strong>first</strong>?', ans: 'Om', wrong: ['Anita', 'Kabir', 'Devansh'], hint: 'Shortest means fewest letters.', exp: 'Om has only 2 letters, so it comes first.' },
        { q: 'Which letter appears <strong>twice</strong> in the name <strong>MANAN</strong>?', ans: 'Both A and N', wrong: ['Only A', 'Only N', 'Only M'], hint: 'Check every letter carefully: M-A-N-A-N.', exp: 'A appears twice and N appears twice in MANAN.' }
    ]);

    /* --- Ch 2: Toy Joy (grouping in tens) -------------------------- */
    const ch2_toys_proc = () => {
        const tens = randInt(2, 9);
        const ones = randInt(0, 9);
        const total = tens * 10 + ones;
        const mode = pick(['total', 'groups']);

        if (mode === 'total') {
            return buildQuestion({
                topic: 'ch2_toys',
                badge: 'Ch-2: Toy Joy',
                q: 'A toy shop packs marbles in bundles of ten. There are <strong>' + tens + ' bundles</strong> and <strong>' + ones + ' loose marbles</strong>. How many marbles in all?',
                visualSVG: '<div class="text-center text-2xl">' + '🧺'.repeat(Math.min(tens, 9)) + ' ' + '🔴'.repeat(ones) + '</div>',
                ans: total,
                wrong: [tens + ones, tens * 10, total + 10, total - 10],
                hint: 'Each bundle is 10. Multiply the bundles by 10, then add the loose ones.',
                exp: tens + ' tens + ' + ones + ' ones = ' + (tens * 10) + ' + ' + ones + ' = <strong>' + total + '</strong>.'
            });
        }

        return buildQuestion({
            topic: 'ch2_toys',
            badge: 'Ch-2: Toy Joy',
            q: 'Meera has <strong>' + total + ' toy cars</strong>. If she packs them in boxes of 10, how many <strong>full boxes</strong> can she make?',
            ans: tens,
            wrong: [ones, tens + 1, total, tens - 1],
            hint: 'The tens digit tells you how many complete groups of ten there are.',
            exp: total + ' = ' + tens + ' tens and ' + ones + ' ones, so ' + tens + ' full boxes (with ' + ones + ' left over).'
        });
    };

    const ch2_toys_bank = bankGenerator('ch2_toys', 'Ch-2: Toy Joy', [
        { q: 'Which is the easiest way to count a big pile of toys quickly?', ans: 'Make groups of ten and then count the groups', wrong: ['Count one by one very fast', 'Guess the number', 'Count only the big toys'], hint: 'Grouping makes counting faster and safer.', exp: 'Grouping in tens is the standard fast and accurate method.' },
        { q: '6 tens and 4 ones make which number?', ans: 64, wrong: [46, 604, 10], hint: 'Tens digit first, then ones digit.', exp: '6 tens = 60, plus 4 ones = 64.' },
        { q: 'How many <strong>tens</strong> are there in 90?', ans: 9, wrong: [90, 0, 19], hint: '10 × ? = 90', exp: '9 × 10 = 90, so there are 9 tens.' },
        { q: 'A packet has 10 balloons. Riya buys 7 packets. How many balloons does she have?', ans: 70, wrong: [17, 7, 700], hint: 'Skip count by tens seven times.', exp: '7 × 10 = 70 balloons.' },
        { q: '87 toys are packed in boxes of ten. How many toys are <strong>left over</strong>?', ans: 7, wrong: [8, 0, 10], hint: 'The ones digit is the leftover.', exp: '87 = 8 boxes of ten + 7 leftover toys.' },
        { q: 'Which number is made of <strong>0 tens and 8 ones</strong>?', ans: 8, wrong: [80, 88, 18], hint: 'No tens at all means the number is a single digit.', exp: '0 tens + 8 ones = 8.' },
        { q: 'Kabir has 3 bundles of 10 sticks and 12 loose sticks. How many sticks in total?', ans: 42, wrong: [32, 15, 312], hint: '12 loose sticks make one more bundle of ten and 2 extra.', exp: '30 + 12 = 42 sticks.' }
    ]);

    /* --- Ch 3: Double Century ------------------------------------- */
    const ch3_century_proc = () => {
        const runs = pick([50, 100, 150, 200, 75, 120, 175, 199]);
        const labels = { 50: 'Half Century', 100: 'Century', 150: 'One and a Half Century', 200: 'Double Century' };
        if (labels[runs]) {
            return buildQuestion({
                topic: 'ch3_century',
                badge: 'Ch-3: Double Century',
                q: 'A cricketer scored <strong>' + runs + ' runs</strong>. What is this score called?',
                ans: labels[runs],
                wrong: ['Half Century', 'Century', 'Double Century', 'One and a Half Century'],
                hint: '50 = half century, 100 = century, 200 = double century.',
                exp: runs + ' runs is called a <strong>' + labels[runs] + '</strong>.'
            });
        }
        const need = 200 - runs;
        return buildQuestion({
            topic: 'ch3_century',
            badge: 'Ch-3: Double Century',
            q: 'A batter has scored <strong>' + runs + ' runs</strong>. How many more runs are needed for a <strong>double century</strong> (200)?',
            ans: need,
            wrong: [200 + runs, need + 10, need - 10, 100 - runs],
            hint: 'A double century is 200 runs. Subtract what is already scored.',
            exp: '200 − ' + runs + ' = <strong>' + need + '</strong> more runs.'
        });
    };

    const ch3_century_bank = bankGenerator('ch3_century', 'Ch-3: Double Century', [
        { q: 'How many <strong>hundreds</strong> are there in 200?', ans: 2, wrong: [20, 200, 1], hint: '100 + 100 = 200', exp: '200 = 2 hundreds.' },
        { q: 'What is the number just <strong>before</strong> 200?', ans: 199, wrong: [201, 190, 100], hint: 'Before means one less.', exp: '200 − 1 = 199.' },
        { q: 'What is the number just <strong>after</strong> 149?', ans: 150, wrong: [148, 140, 151], hint: 'After means one more.', exp: '149 + 1 = 150.' },
        { q: 'Which of these is <strong>more than</strong> a century (100)?', ans: 143, wrong: [98, 89, 100], hint: 'More than 100.', exp: '143 is greater than 100.' },
        { q: '2 half-centuries make how many runs?', ans: 100, wrong: [50, 150, 200], hint: 'A half century is 50 runs.', exp: '50 + 50 = 100 runs, i.e. one century.' },
        { q: 'A team scored 120 in the first innings and 80 in the second. Total runs?', ans: 200, wrong: [140, 100, 220], hint: 'Add both innings.', exp: '120 + 80 = 200 runs — a double century for the team.' },
        { q: 'Count in hundreds: 100, 200, 300, ___', ans: 400, wrong: [310, 350, 500], hint: 'Add 100 each time.', exp: '300 + 100 = 400.' },
        { q: 'Which number is exactly <strong>halfway</strong> between 100 and 200?', ans: 150, wrong: [120, 175, 250], hint: 'Halfway means add 50 to 100.', exp: '100 + 50 = 150 is halfway to 200.' }
    ]);

    /* --- Ch 4: Vacation with My Nani Maa (Shapes) ------------------ */
    const SHAPES = [
        { name: 'Triangle', corners: 3, edges: 3, straight: true, svg: '<polygon points="50,15 90,85 10,85" fill="#e0e7ff" stroke="#4f46e5" stroke-width="4"/>' },
        { name: 'Square', corners: 4, edges: 4, straight: true, svg: '<rect x="20" y="20" width="60" height="60" fill="#fef3c7" stroke="#f59e0b" stroke-width="4"/>' },
        { name: 'Rectangle', corners: 4, edges: 4, straight: true, svg: '<rect x="10" y="25" width="80" height="50" fill="#dcfce7" stroke="#10b981" stroke-width="4"/>' },
        { name: 'Circle', corners: 0, edges: 1, straight: false, svg: '<circle cx="50" cy="50" r="35" fill="#fce7f3" stroke="#ec4899" stroke-width="4"/>' },
        { name: 'Pentagon', corners: 5, edges: 5, straight: true, svg: '<polygon points="50,12 92,42 76,88 24,88 8,42" fill="#fae8ff" stroke="#a855f7" stroke-width="4"/>' },
        { name: 'Hexagon', corners: 6, edges: 6, straight: true, svg: '<polygon points="30,12 70,12 92,50 70,88 30,88 8,50" fill="#cffafe" stroke="#0891b2" stroke-width="4"/>' },
        { name: 'Oval', corners: 0, edges: 1, straight: false, svg: '<ellipse cx="50" cy="50" rx="40" ry="26" fill="#ffedd5" stroke="#ea580c" stroke-width="4"/>' },
        { name: 'Semi-circle', corners: 2, edges: 2, straight: false, svg: '<path d="M10,70 A40,40 0 0 1 90,70 Z" fill="#dbeafe" stroke="#2563eb" stroke-width="4"/>' }
    ];

    const ch4_shapes_proc = () => {
        const item = pick(SHAPES);
        const askCorners = Math.random() > 0.45;
        const target = askCorners ? 'corners (vertices)' : 'sides / edges';
        const ans = askCorners ? item.corners : item.edges;

        return buildQuestion({
            topic: 'ch4_shapes',
            badge: 'Ch-4: Shapes, Corners & Edges',
            q: 'Look at the shape below. How many <strong>' + target + '</strong> does a <strong>' + item.name + '</strong> have?',
            visualSVG: '<svg class="w-28 h-28 mx-auto" viewBox="0 0 100 100">' + item.svg + '</svg>',
            ans: ans,
            wrong: [ans + 1, Math.max(0, ans - 1), ans + 2, ans + 3],
            hint: 'A corner is the sharp point where two sides meet. A side is the boundary line between two corners.',
            exp: 'A <strong>' + item.name + '</strong> has ' + item.corners + ' corner(s) and ' + item.edges + ' side(s).'
        });
    };

    const ch4_shapes_bank = bankGenerator('ch4_shapes', 'Ch-4: Shape Riddles', [
        { q: 'I have 3 sides and 3 corners. Who am I?', ans: 'Triangle', wrong: ['Square', 'Circle', 'Rectangle'], hint: 'Think of a samosa or a slice of pizza.', exp: 'A triangle has 3 sides and 3 corners.' },
        { q: 'I have 4 equal sides and 4 corners. Who am I?', ans: 'Square', wrong: ['Rectangle', 'Triangle', 'Pentagon'], hint: 'All four sides are exactly the same length.', exp: 'A square has 4 equal sides and 4 corners.' },
        { q: 'I am round. I have no corners at all. Who am I?', ans: 'Circle', wrong: ['Square', 'Oval', 'Triangle'], hint: 'Think of a chapati or a bangle.', exp: 'A circle is round and has zero corners.' },
        { q: 'I have 4 corners, but my opposite sides are equal (not all four). Who am I?', ans: 'Rectangle', wrong: ['Square', 'Rhombus', 'Circle'], hint: 'Think of a door or a book cover.', exp: 'A rectangle has 4 corners with opposite sides equal.' },
        { q: 'Which shape has the <strong>most corners</strong>?', ans: 'Hexagon', wrong: ['Triangle', 'Square', 'Pentagon'], hint: 'Hexa means six.', exp: 'A hexagon has 6 corners, more than the others listed.' },
        { q: 'A chapati is closest to which shape?', ans: 'Circle', wrong: ['Square', 'Triangle', 'Rectangle'], hint: 'It is round with no corners.', exp: 'A chapati is circular.' },
        { q: 'Nani Maa\'s window has 4 corners and 4 sides where opposite sides are equal. What shape is it?', ans: 'Rectangle', wrong: ['Triangle', 'Circle', 'Pentagon'], hint: 'Windows are usually rectangular.', exp: 'It is a rectangle.' },
        { q: 'How many corners does a shape with <strong>5 sides</strong> have?', ans: 5, wrong: [4, 6, 10], hint: 'In any closed straight-sided shape, sides = corners.', exp: 'Sides and corners are always equal in number: 5 sides → 5 corners.' },
        { q: 'Which shape can you make by joining <strong>two triangles</strong> along their equal sides?', ans: 'Square', wrong: ['Circle', 'Pentagon', 'Oval'], hint: 'Two right triangles joined along the long side.', exp: 'Two equal right-angled triangles join to form a square (or rectangle).' },
        { q: 'A shape has 0 corners and 1 curved boundary. What is it?', ans: 'Circle', wrong: ['Semi-circle', 'Triangle', 'Hexagon'], hint: 'No corners at all.', exp: 'Only a circle (or oval) has zero corners and one curved boundary.' }
    ]);

    /* --- Ch 4: Straight vs Curved --------------------------------- */
    const STRAIGHT_CURVED = [
        { name: 'Postcard', type: 'Straight Edges' },
        { name: 'Blackboard', type: 'Straight Edges' },
        { name: 'Book cover', type: 'Straight Edges' },
        { name: 'Kite', type: 'Straight Edges' },
        { name: 'Envelope', type: 'Straight Edges' },
        { name: 'Bangle', type: 'Curved Edges' },
        { name: 'Coin', type: 'Curved Edges' },
        { name: 'Bicycle wheel', type: 'Curved Edges' },
        { name: 'Plate', type: 'Curved Edges' },
        { name: 'Bindi', type: 'Curved Edges' },
        { name: 'Ice-cream cone (side view)', type: 'Both Straight & Curved' },
        { name: 'Half chapati (semi-circle)', type: 'Both Straight & Curved' },
        { name: 'Paper fan (open)', type: 'Both Straight & Curved' }
    ];

    const ch4_lines_proc = () => {
        const item = pick(STRAIGHT_CURVED);
        return buildQuestion({
            topic: 'ch4_lines',
            badge: 'Ch-4: Straight vs Curved',
            q: 'Does a <strong>' + item.name + '</strong> have straight edges, curved edges, or both?',
            ans: item.type,
            wrong: ['Straight Edges', 'Curved Edges', 'Both Straight & Curved', 'No edges at all'],
            hint: 'A straight edge can be traced with a ruler. A curved edge bends smoothly.',
            exp: 'A ' + item.name.toLowerCase() + ' has <strong>' + item.type.toLowerCase() + '</strong>.'
        });
    };

    const ch4_lines_bank = bankGenerator('ch4_lines', 'Ch-4: Lines & Boundaries', [
        { q: 'Which tool is used to draw a <strong>straight line</strong>?', ans: 'Ruler (scale)', wrong: ['Compass', 'Eraser', 'Sharpener'], hint: 'It has a straight edge and markings.', exp: 'A ruler is used to draw straight lines.' },
        { q: 'Which tool helps you draw a perfect <strong>circle</strong>?', ans: 'Compass', wrong: ['Ruler', 'Protractor', 'Divider'], hint: 'It has a pointed leg and a pencil leg.', exp: 'A compass draws circles.' },
        { q: 'The line where the sky seems to meet the ground is mostly...', ans: 'Straight', wrong: ['Zig-zag', 'Curved sharply', 'Broken'], hint: 'Think of looking at the sea.', exp: 'The horizon appears as a straight line.' },
        { q: 'A <strong>zig-zag</strong> line is made of many...', ans: 'Short straight lines joined at angles', wrong: ['Curves joined smoothly', 'Dots only', 'Circles'], hint: 'Zig-zag turns sharply.', exp: 'Zig-zag lines are short straight segments meeting at sharp turns.' },
        { q: 'Which of these has <strong>no straight edge</strong> at all?', ans: 'Bangle', wrong: ['Notebook', 'Ruler', 'Door'], hint: 'It is fully round.', exp: 'A bangle is fully curved with no straight edge.' },
        { q: 'A rangoli made with only straight lines will look like a...', ans: 'Shape with corners', wrong: ['Perfect circle', 'Smooth curve', 'Wave'], hint: 'Straight lines create corners where they meet.', exp: 'Straight lines always meet at corners.' }
    ]);

    /* --- Ch 4: Grid paths & directions ----------------------------- */
    const ch4_paths_proc = () => {
        const mode = pick(['total', 'direction', 'shorter']);
        const east = randInt(2, 7);
        const north = randInt(2, 6);
        const total = east + north;

        if (mode === 'total') {
            return buildQuestion({
                topic: 'ch4_paths',
                badge: 'Ch-4: Grid Paths',
                q: 'Rahul walks <strong>' + east + ' blocks East</strong> and then <strong>' + north + ' blocks North</strong> to reach the mango orchard. How many blocks did he walk in all?',
                visualSVG: '<div class="text-center text-3xl">🏡 ➔ 🚶 ➔ 🥭</div>',
                ans: total,
                wrong: [east * north, Math.abs(east - north), total + 1, total - 1],
                hint: 'Add the blocks walked in each direction.',
                exp: east + ' + ' + north + ' = <strong>' + total + '</strong> blocks.'
            });
        }

        if (mode === 'shorter') {
            const other = total + randInt(1, 4);
            return buildQuestion({
                topic: 'ch4_paths',
                badge: 'Ch-4: Grid Paths',
                q: 'Path A is <strong>' + total + ' blocks</strong> long and Path B is <strong>' + other + ' blocks</strong> long. Which path is <strong>shorter</strong>, and by how many blocks?',
                ans: 'Path A, by ' + (other - total) + ' blocks',
                wrong: ['Path B, by ' + (other - total) + ' blocks', 'Path A, by ' + (other - total + 1) + ' blocks', 'Both are equal'],
                hint: 'Subtract the smaller length from the bigger length.',
                exp: other + ' − ' + total + ' = ' + (other - total) + ', so Path A is shorter by ' + (other - total) + ' blocks.'
            });
        }

        const opposites = { East: 'West', West: 'East', North: 'South', South: 'North' };
        const dir = pick(Object.keys(opposites));
        return buildQuestion({
            topic: 'ch4_paths',
            badge: 'Ch-4: Directions',
            q: 'Dhyana walks towards the <strong>' + dir + '</strong>. To come back home she must walk towards the...',
            ans: opposites[dir],
            wrong: Object.keys(opposites),
            hint: 'To return, you walk in the opposite direction.',
            exp: 'The opposite of ' + dir + ' is <strong>' + opposites[dir] + '</strong>.'
        });
    };

    const ch4_paths_bank = bankGenerator('ch4_paths', 'Ch-4: Grid Paths & Directions', [
        { q: 'The sun rises in which direction?', ans: 'East', wrong: ['West', 'North', 'South'], hint: 'Sunrise direction.', exp: 'The sun always rises in the East.' },
        { q: 'The sun sets in which direction?', ans: 'West', wrong: ['East', 'North', 'South'], hint: 'Opposite of sunrise.', exp: 'The sun sets in the West.' },
        { q: 'If you face East, which direction is on your <strong>left hand</strong>?', ans: 'North', wrong: ['South', 'West', 'East'], hint: 'Face East; North is to your left, South to your right.', exp: 'Facing East, North is on the left.' },
        { q: 'On a grid, moving 1 block right and 1 block up needs how many moves?', ans: 2, wrong: [1, 3, 4], hint: 'Count each block move.', exp: '1 + 1 = 2 moves.' },
        { q: 'Which path is the <strong>shortest</strong> way between two points?', ans: 'A straight line', wrong: ['A zig-zag path', 'A curved path', 'A path with many turns'], hint: 'No turns needed.', exp: 'A straight line is always the shortest distance between two points.' },
        { q: 'Nani Maa\'s house is 4 blocks from the temple. Going and coming back covers how many blocks?', ans: 8, wrong: [4, 12, 16], hint: 'Going + returning = double.', exp: '4 + 4 = 8 blocks.' }
    ]);

    /* --- Ch 4: Non-standard measurement ---------------------------- */
    const ch4_spans_proc = () => {
        const mode = pick(['why', 'unit', 'count']);
        if (mode === 'why') {
            const kid = randInt(14, 20);
            const nani = randInt(9, 13);
            return buildQuestion({
                topic: 'ch4_spans',
                badge: 'Ch-4: Footspan Measurement',
                q: 'A room measures <strong>' + kid + ' footspans</strong> of young Dhyana but only <strong>' + nani + ' footspans</strong> of Nani Maa. Why is Nani Maa\'s count smaller?',
                ans: 'Nani Maa\'s feet are longer, so each step covers more distance',
                wrong: [
                    'Dhyana\'s feet are longer than Nani Maa\'s',
                    'The room became smaller',
                    'Nani Maa walked faster than Dhyana'
                ],
                hint: 'A bigger unit needs fewer repeats to cover the same length.',
                exp: 'Bigger unit → fewer counts. Nani Maa\'s longer feet cover the room in fewer steps.'
            });
        }
        if (mode === 'count') {
            const unit = pick([{ n: 'handspans', size: 3 }, { n: 'cubits', size: 6 }, { n: 'paces', size: 8 }]);
            const times = randInt(3, 9);
            const total = unit.size * times;
            return buildQuestion({
                topic: 'ch4_spans',
                badge: 'Ch-4: Non-Standard Units',
                q: 'A rope is measured as <strong>' + times + ' ' + unit.n + '</strong>. If one ' + unit.n.slice(0, -1) + ' is about <strong>' + unit.size + ' units</strong> long, how long is the rope?',
                ans: total,
                wrong: [times + unit.size, total + unit.size, total - unit.size, times * (unit.size + 1)],
                hint: 'Repeated addition: add the unit length as many times as it was counted.',
                exp: times + ' × ' + unit.size + ' = <strong>' + total + '</strong> units.'
            });
        }
        const item = pick([
            { thing: 'the length of a classroom', ans: 'Paces (footsteps)' },
            { thing: 'the length of a pencil', ans: 'Fingerwidths' },
            { thing: 'the width of a table', ans: 'Handspans' },
            { thing: 'the length of a cloth', ans: 'Cubits (elbow to fingertip)' }
        ]);
        return buildQuestion({
            topic: 'ch4_spans',
            badge: 'Ch-4: Non-Standard Units',
            q: 'Which non-standard unit is <strong>most suitable</strong> to measure <strong>' + item.thing + '</strong>?',
            ans: item.ans,
            wrong: ['Paces (footsteps)', 'Fingerwidths', 'Handspans', 'Cubits (elbow to fingertip)'],
            hint: 'Use a small unit for small things and a big unit for big things.',
            exp: '<strong>' + item.ans + '</strong> matches the size of ' + item.thing + ' best.'
        });
    };

    const ch4_spans_bank = bankGenerator('ch4_spans', 'Ch-4: Measurement', [
        { q: 'Why do we use <strong>standard units</strong> like the metre instead of footspans?', ans: 'Because everybody\'s feet are of different sizes', wrong: ['Because footspans are too big', 'Because it is a rule in the book', 'Because feet get tired'], hint: 'Measurements must give the same answer for everyone.', exp: 'Non-standard units differ from person to person, so standard units are used.' },
        { q: 'A <strong>cubit</strong> is the length from the elbow to the...', ans: 'Tip of the middle finger', wrong: ['Shoulder', 'Knee', 'Wrist only'], hint: 'It is an old Indian unit of length.', exp: 'A cubit = elbow to fingertip.' },
        { q: 'Which is <strong>longer</strong> — one handspan or one cubit?', ans: 'One cubit', wrong: ['One handspan', 'Both are equal', 'Cannot say'], hint: 'A cubit uses the whole forearm.', exp: 'A cubit is longer than a handspan.' },
        { q: 'If a smaller unit is used to measure the same length, the count will be...', ans: 'More', wrong: ['Less', 'The same', 'Zero'], hint: 'Smaller pieces means more pieces needed.', exp: 'Smaller unit → larger count.' },
        { q: 'Which of these is a <strong>standard</strong> unit of length?', ans: 'Metre', wrong: ['Footspan', 'Handspan', 'Pace'], hint: 'It is the same everywhere in the world.', exp: 'The metre is a standard unit.' },
        { q: 'A table is 5 handspans of Aarav and 4 handspans of his father. Whose handspan is longer?', ans: 'Father\'s', wrong: ['Aarav\'s', 'Both are equal', 'Cannot say'], hint: 'Fewer counts means a bigger unit.', exp: 'Fewer handspans (4) means the father\'s handspan is longer.' }
    ]);

    /* --- Ch 5: Fun with Shapes (3D) -------------------------------- */
    const SOLIDS = [
        { name: 'Ball / Sphere', roll: 'Only rolls', stack: 'Cannot be stacked', faces: 'Curved surface only', emoji: '⚽' },
        { name: 'Book / Cuboid', roll: 'Only slides', stack: 'Can be stacked', faces: '6 flat faces', emoji: '📕' },
        { name: 'Dice / Cube', roll: 'Only slides', stack: 'Can be stacked', faces: '6 equal square faces', emoji: '🎲' },
        { name: 'Tin can / Cylinder', roll: 'Both rolls and slides', stack: 'Can be stacked', faces: '2 flat circles + 1 curved surface', emoji: '🥫' },
        { name: 'Ice-cream cone / Cone', roll: 'Both rolls and slides', stack: 'Cannot be stacked easily', faces: '1 flat circle + 1 curved surface', emoji: '🍦' }
    ];

    const ch5_shapes_fun_proc = () => {
        const item = pick(SOLIDS);
        const mode = pick(['roll', 'stack', 'faces']);
        const map = {
            roll: { q: 'Does a <strong>' + item.name + '</strong> roll, slide, or do both?', ans: item.roll, wrong: ['Only rolls', 'Only slides', 'Both rolls and slides'], hint: 'Curved surfaces roll; flat faces slide.' },
            stack: { q: 'Can a <strong>' + item.name + '</strong> be neatly stacked one on top of another?', ans: item.stack, wrong: ['Can be stacked', 'Cannot be stacked', 'Cannot be stacked easily'], hint: 'Only objects with flat faces stack well.' },
            faces: { q: 'Which surfaces does a <strong>' + item.name + '</strong> have?', ans: item.faces, wrong: SOLIDS.map((s) => s.faces), hint: 'Count the flat faces and curved surfaces.' }
        };
        const cfg = map[mode];
        return buildQuestion({
            topic: 'ch5_shapes_fun',
            badge: 'Ch-5: Fun with Shapes',
            q: cfg.q,
            visualSVG: '<div class="text-center text-5xl">' + item.emoji + '</div>',
            ans: cfg.ans,
            wrong: cfg.wrong,
            hint: cfg.hint,
            exp: item.name + ': ' + item.roll.toLowerCase() + ', ' + item.stack.toLowerCase() + ', ' + item.faces.toLowerCase() + '.'
        });
    };

    const ch5_shapes_fun_bank = bankGenerator('ch5_shapes_fun', 'Ch-5: Fun with Shapes', [
        { q: 'How many <strong>flat faces</strong> does a cube have?', ans: 6, wrong: [4, 8, 12], hint: 'Think of a dice.', exp: 'A cube has 6 flat square faces.' },
        { q: 'How many <strong>edges</strong> does a cube have?', ans: 12, wrong: [6, 8, 4], hint: 'Edges are where two faces meet.', exp: 'A cube has 12 edges.' },
        { q: 'How many <strong>corners</strong> does a cube have?', ans: 8, wrong: [6, 12, 4], hint: 'Count the pointed tips of a dice.', exp: 'A cube has 8 corners (vertices).' },
        { q: 'Which solid shape has <strong>no corners and no edges</strong>?', ans: 'Sphere', wrong: ['Cube', 'Cone', 'Cylinder'], hint: 'It is perfectly round.', exp: 'A sphere has no corner and no edge.' },
        { q: 'A <strong>tangram</strong> puzzle is made by cutting a square into how many pieces?', ans: 7, wrong: [5, 6, 8], hint: 'Classic Chinese puzzle.', exp: 'A tangram has 7 pieces.' },
        { q: 'Which shape do you get by tracing around the flat face of a tin can?', ans: 'Circle', wrong: ['Square', 'Triangle', 'Rectangle'], hint: 'The bottom of a can is round.', exp: 'Tracing a cylinder\'s flat face gives a circle.' },
        { q: 'Which shape do you get by tracing one face of a dice?', ans: 'Square', wrong: ['Circle', 'Triangle', 'Oval'], hint: 'Each face of a dice is the same.', exp: 'A cube face traces out a square.' },
        { q: 'A shape that looks the <strong>same on both halves</strong> when folded is called...', ans: 'Symmetrical', wrong: ['Circular', 'Curved', 'Irregular'], hint: 'Think of a butterfly.', exp: 'Such a shape is symmetrical; the fold line is the line of symmetry.' },
        { q: 'How many lines of symmetry does a <strong>square</strong> have?', ans: 4, wrong: [2, 1, 6], hint: 'Two through the middle, two diagonals.', exp: 'A square has 4 lines of symmetry.' },
        { q: 'Which of these objects will <strong>roll down a slope</strong>?', ans: 'Football', wrong: ['Brick', 'Book', 'Box'], hint: 'It must have a curved surface.', exp: 'A football (sphere) rolls; flat-faced objects slide.' }
    ]);

    /* --- Ch 6: Place value ---------------------------------------- */
    const PLACE_NAMES = ['Hundreds', 'Tens', 'Ones'];

    const ch6_placeval_proc = () => {
        const h = randInt(1, 9), t = randInt(0, 9), o = randInt(0, 9);
        const num = h * 100 + t * 10 + o;
        const pickPlace = pick(PLACE_NAMES);
        const digit = pickPlace === 'Hundreds' ? h : (pickPlace === 'Tens' ? t : o);
        const askFace = Math.random() > 0.65;

        if (askFace) {
            return buildQuestion({
                topic: 'ch6_placeval',
                badge: 'Ch-6: Face Value',
                q: 'In the number <strong>' + num + '</strong>, what is the <strong>face value</strong> of the digit in the <strong>' + pickPlace + '</strong> place?',
                ans: digit,
                wrong: [h * 100, t * 10, o, digit * 10],
                hint: 'Face value is simply the digit itself — it never changes with position.',
                exp: 'The digit in the ' + pickPlace + ' place is ' + digit + ', so its face value is <strong>' + digit + '</strong>.'
            });
        }

        const placeValue = pickPlace === 'Hundreds' ? h * 100 : (pickPlace === 'Tens' ? t * 10 : o);
        return buildQuestion({
            topic: 'ch6_placeval',
            badge: 'Ch-6: Place Value',
            q: 'In the number <strong>' + num + '</strong>, what is the <strong>place value</strong> of the digit <strong>' + digit + '</strong> (in the ' + pickPlace + ' place)?',
            ans: placeValue,
            wrong: [digit, h * 100, t * 10, o, digit * 100],
            hint: 'Place value = digit × (100 for hundreds, 10 for tens, 1 for ones).',
            exp: 'Digit ' + digit + ' in the ' + pickPlace + ' place has place value <strong>' + placeValue + '</strong>.'
        });
    };

    const ch6_placeval_bank = bankGenerator('ch6_placeval', 'Ch-6: Place & Face Value', [
        { q: 'What is the difference between <strong>place value</strong> and <strong>face value</strong> of 7 in 472?', ans: 63, wrong: [7, 70, 77], hint: 'Place value = 70, face value = 7.', exp: '70 − 7 = 63.' },
        { q: 'In 508, the digit <strong>0</strong> is in which place?', ans: 'Tens', wrong: ['Ones', 'Hundreds', 'Thousands'], hint: 'Read from the right: ones, tens, hundreds.', exp: '5-0-8 → 0 sits in the tens place.' },
        { q: 'What is the place value of 0 in the number 903?', ans: 0, wrong: [10, 90, 3], hint: 'Zero multiplied by anything is zero.', exp: '0 × 10 = 0. The place value of 0 is always 0.' },
        { q: 'Which digit is in the <strong>hundreds place</strong> in 736?', ans: 7, wrong: [3, 6, 700], hint: 'The leftmost digit of a 3-digit number.', exp: '7 is in the hundreds place.' },
        { q: 'In which number does the digit <strong>4</strong> have the place value <strong>40</strong>?', ans: 249, wrong: ['423', '904', '134'], hint: 'The 4 must be in the tens place.', exp: 'In 249, the 4 is in the tens place with place value 40.' },
        { q: 'In which number does 6 have the <strong>greatest</strong> place value?', ans: 632, wrong: ['263', '326', '236'], hint: 'Look for 6 in the hundreds place.', exp: 'In 632 the 6 is in the hundreds place → place value 600.' },
        { q: 'The face value of a digit is always...', ans: 'The digit itself', wrong: ['Digit × 10', 'Digit × 100', 'Always zero'], hint: 'It does not depend on position.', exp: 'Face value = the digit itself.' }
    ]);

    /* --- Ch 6: Expanded form -------------------------------------- */
    const ch6_expanded_proc = () => {
        const h = randInt(1, 9), t = randInt(0, 9), o = randInt(0, 9);
        const num = h * 100 + t * 10 + o;
        const reverse = Math.random() > 0.5;
        const expanded = (h * 100) + ' + ' + (t * 10) + ' + ' + o;

        if (reverse) {
            return buildQuestion({
                topic: 'ch6_expanded',
                badge: 'Ch-6: Expanded → Standard',
                q: 'Which number is written in expanded form as <strong>' + expanded + '</strong>?',
                ans: num,
                wrong: [h * 100 + o * 10 + t, t * 100 + h * 10 + o, num + 10, num - 100],
                hint: 'Add all the parts together.',
                exp: (h * 100) + ' + ' + (t * 10) + ' + ' + o + ' = <strong>' + num + '</strong>.'
            });
        }

        return buildQuestion({
            topic: 'ch6_expanded',
            badge: 'Ch-6: Expanded Form',
            q: 'What is the correct <strong>expanded form</strong> of <strong>' + num + '</strong>?',
            ans: expanded,
            wrong: [
                (h * 100) + ' + ' + t + ' + ' + o,
                (h * 10) + ' + ' + (t * 10) + ' + ' + o,
                (h * 100) + ' + ' + (t * 10) + ' + ' + (o * 10),
                h + ' + ' + t + ' + ' + o
            ],
            hint: 'Split the number into hundreds, tens and ones.',
            exp: num + ' = ' + expanded + '.'
        });
    };

    /* --- Ch 6: Number names --------------------------------------- */
    const UNITS = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const TEENS = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const TENS_WORDS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    function numberToWords(num) {
        const h = Math.floor(num / 100);
        const t = Math.floor((num % 100) / 10);
        const o = num % 10;
        let words = h > 0 ? UNITS[h] + ' Hundred' : '';
        const rest = num % 100;
        if (rest > 0) {
            if (h > 0) words += ' and ';
            if (t === 1) words += TEENS[o];
            else {
                if (t > 1) words += TENS_WORDS[t];
                if (o > 0) words += (t > 1 ? ' ' : '') + UNITS[o];
            }
        }
        return words.trim();
    }

    const ch6_words_proc = () => {
        const num = randInt(100, 999);
        const words = numberToWords(num);
        const reverse = Math.random() > 0.5;

        if (reverse) {
            const wrongNums = [];
            while (wrongNums.length < 3) {
                const cand = Math.min(999, Math.max(100, num + randInt(-40, 40)));
                if (cand !== num && wrongNums.indexOf(cand) === -1) wrongNums.push(cand);
            }
            return buildQuestion({
                topic: 'ch6_words',
                badge: 'Ch-6: Number Names',
                q: 'Which number is written in words as <strong>"' + words + '"</strong>?',
                ans: num,
                wrong: wrongNums,
                hint: 'Write the hundreds digit first, then the tens and ones.',
                exp: '"' + words + '" = <strong>' + num + '</strong>.'
            });
        }

        const wrongWords = [];
        while (wrongWords.length < 3) {
            const cand = Math.min(999, Math.max(100, num + randInt(-60, 60)));
            const w = numberToWords(cand);
            if (cand !== num && wrongWords.indexOf(w) === -1) wrongWords.push(w);
        }
        return buildQuestion({
            topic: 'ch6_words',
            badge: 'Ch-6: Number Names',
            q: 'How do we write <strong>' + num + '</strong> in words?',
            ans: words,
            wrong: wrongWords,
            hint: 'Say the number out loud: hundreds first, then the rest.',
            exp: num + ' is written as <strong>' + words + '</strong>.'
        });
    };

    /* --- Ch 6: Comparing & ordering -------------------------------- */
    const ch6_compare_proc = () => {
        const mode = pick(['symbol', 'greatest', 'smallest', 'order']);

        if (mode === 'symbol') {
            const a = randInt(100, 999);
            let b = randInt(100, 999);
            while (a === b) b = randInt(100, 999);
            const ans = a > b ? '&gt; (Greater than)' : '&lt; (Less than)';
            return buildQuestion({
                topic: 'ch6_compare',
                badge: 'Ch-6: Comparing Numbers',
                q: 'Fill in the correct symbol: <strong>' + a + ' [ ? ] ' + b + '</strong>',
                ans: ans,
                wrong: ['&gt; (Greater than)', '&lt; (Less than)', '= (Equal to)'],
                hint: 'Compare the hundreds digit first. If they are equal, compare the tens, then the ones.',
                exp: a + ' is ' + (a > b ? 'greater than' : 'less than') + ' ' + b + '.'
            });
        }

        const nums = [];
        while (nums.length < 4) {
            const n = randInt(100, 999);
            if (nums.indexOf(n) === -1) nums.push(n);
        }
        const sortedAsc = nums.slice().sort((x, y) => x - y);

        if (mode === 'greatest' || mode === 'smallest') {
            const wantGreatest = mode === 'greatest';
            const ans = wantGreatest ? sortedAsc[3] : sortedAsc[0];
            return buildQuestion({
                topic: 'ch6_compare',
                badge: 'Ch-6: Comparing Numbers',
                q: 'Which is the <strong>' + (wantGreatest ? 'GREATEST' : 'SMALLEST') + '</strong> number: <strong>' + nums.join(', ') + '</strong>?',
                ans: ans,
                wrong: nums.filter((n) => n !== ans),
                hint: 'Line the numbers up and compare hundreds digits first.',
                exp: 'In ascending order: ' + sortedAsc.join(' < ') + '. So the ' + (wantGreatest ? 'greatest' : 'smallest') + ' is <strong>' + ans + '</strong>.'
            });
        }

        const ascending = Math.random() > 0.5;
        const correct = (ascending ? sortedAsc : sortedAsc.slice().reverse()).join(', ');
        return buildQuestion({
            topic: 'ch6_compare',
            badge: 'Ch-6: Ordering Numbers',
            q: 'Arrange in <strong>' + (ascending ? 'ASCENDING' : 'DESCENDING') + '</strong> order: <strong>' + nums.join(', ') + '</strong>',
            ans: correct,
            wrong: [
                (ascending ? sortedAsc.slice().reverse() : sortedAsc).join(', '),
                nums.join(', '),
                shuffle(nums).join(', ')
            ],
            hint: ascending ? 'Ascending means smallest to biggest.' : 'Descending means biggest to smallest.',
            exp: 'Correct ' + (ascending ? 'ascending' : 'descending') + ' order: <strong>' + correct + '</strong>.'
        });
    };

    const ch6_compare_bank = bankGenerator('ch6_compare', 'Ch-6: Comparing Numbers', [
        { q: 'Which is the <strong>largest 3-digit number</strong>?', ans: 999, wrong: [900, 998, 1000], hint: 'All three digits must be as big as possible.', exp: '999 is the largest 3-digit number.' },
        { q: 'Which is the <strong>smallest 3-digit number</strong>?', ans: 100, wrong: [99, 111, 101], hint: 'It must have exactly 3 digits.', exp: '100 is the smallest 3-digit number.' },
        { q: 'What comes just <strong>after</strong> 599?', ans: 600, wrong: [598, 5910, 610], hint: 'Add 1.', exp: '599 + 1 = 600.' },
        { q: 'What comes just <strong>before</strong> 700?', ans: 699, wrong: [701, 690, 600], hint: 'Subtract 1.', exp: '700 − 1 = 699.' },
        { q: 'Which number lies <strong>between</strong> 348 and 350?', ans: 349, wrong: [347, 351, 340], hint: 'It is one more than 348.', exp: '349 lies between 348 and 350.' },
        { q: 'Compare: 405 ___ 450', ans: '&lt; (Less than)', wrong: ['&gt; (Greater than)', '= (Equal to)', 'Cannot compare'], hint: 'Hundreds are equal, so compare tens: 0 vs 5.', exp: '405 is less than 450.' },
        { q: 'Which of these is <strong>nearest to 500</strong>?', ans: 498, wrong: [480, 520, 550], hint: 'Find the smallest difference from 500.', exp: '500 − 498 = 2, the smallest gap.' }
    ]);

    /* --- Ch 6: Skip counting & patterns ---------------------------- */
    const ch6_patterns_proc = () => {
        const step = pick([2, 3, 5, 10, 20, 25, 50, 100]);
        const backward = Math.random() > 0.6;
        const start = randInt(1, 5) * step + randInt(100, 500);
        const seq = [];
        for (let i = 0; i < 4; i++) seq.push(backward ? start - i * step : start + i * step);
        const ans = backward ? start - 4 * step : start + 4 * step;

        return buildQuestion({
            topic: 'ch6_patterns',
            badge: 'Ch-6: Skip Counting',
            q: 'Find the next number in the pattern: <strong>' + seq.join(', ') + ', ___</strong>',
            ans: ans,
            wrong: [ans + step, ans - step, ans + 2 * step, ans + 1],
            hint: 'Find the gap: ' + seq[1] + ' − ' + seq[0] + ' = ' + (seq[1] - seq[0]) + '.',
            exp: 'The pattern ' + (backward ? 'subtracts' : 'adds') + ' ' + step + ' each time, so after ' + seq[3] + ' comes <strong>' + ans + '</strong>.'
        });
    };

    const ch6_patterns_bank = bankGenerator('ch6_patterns', 'Ch-6: Patterns', [
        { q: 'Skip count by 5: 5, 10, 15, 20, ___', ans: 25, wrong: [21, 30, 24], hint: 'Add 5.', exp: '20 + 5 = 25.' },
        { q: 'Skip count by 2 backwards: 20, 18, 16, ___', ans: 14, wrong: [15, 12, 17], hint: 'Subtract 2.', exp: '16 − 2 = 14.' },
        { q: 'Which numbers do you say when you skip count by 10 from 100?', ans: '110, 120, 130', wrong: ['101, 102, 103', '105, 110, 115', '200, 300, 400'], hint: 'Add 10 each time.', exp: '100 → 110 → 120 → 130.' },
        { q: 'Complete the pattern: 2, 4, 6, 8, ___, 12', ans: 10, wrong: [9, 11, 14], hint: 'These are even numbers.', exp: 'Even numbers: 8 + 2 = 10.' },
        { q: 'Complete the pattern: 1, 3, 5, 7, ___', ans: 9, wrong: [8, 10, 11], hint: 'These are odd numbers.', exp: 'Odd numbers: 7 + 2 = 9.' },
        { q: 'Which number is <strong>missing</strong>: 315, 320, ___, 330', ans: 325, wrong: [321, 322, 328], hint: 'The step is 5.', exp: '320 + 5 = 325.' },
        { q: 'A pattern goes 100, 200, 300... What is the 6th number?', ans: 600, wrong: [500, 700, 360], hint: 'Multiply 100 by the position.', exp: '6 × 100 = 600.' },
        { q: 'Is 246 an <strong>even</strong> or <strong>odd</strong> number?', ans: 'Even', wrong: ['Odd', 'Both', 'Neither'], hint: 'Look at the last digit.', exp: 'It ends in 6, so 246 is even.' },
        { q: 'Which of these is an <strong>odd</strong> number?', ans: 407, wrong: [408, 410, 422], hint: 'Odd numbers end in 1, 3, 5, 7 or 9.', exp: '407 ends in 7, so it is odd.' }
    ]);

    /* --- Ch 6: Building numbers ------------------------------------ */
    const ch6_building_proc = () => {
        const digits = [];
        while (digits.length < 3) {
            const d = randInt(1, 9);
            if (digits.indexOf(d) === -1) digits.push(d);
        }
        const isLargest = Math.random() > 0.5;
        const sorted = digits.slice().sort((a, b) => (isLargest ? b - a : a - b));
        const ans = parseInt(sorted.join(''), 10);
        const other = parseInt(digits.slice().sort((a, b) => (isLargest ? a - b : b - a)).join(''), 10);

        return buildQuestion({
            topic: 'ch6_building',
            badge: 'Ch-6: Building Numbers',
            q: 'Make the <strong>' + (isLargest ? 'LARGEST' : 'SMALLEST') + '</strong> 3-digit number using the digits <strong>' + digits.join(', ') + '</strong> without repeating any digit.',
            ans: ans,
            wrong: [other, parseInt(digits.join(''), 10), parseInt(shuffle(digits).join(''), 10)],
            hint: isLargest ? 'Put the biggest digit in the hundreds place.' : 'Put the smallest digit in the hundreds place.',
            exp: 'Arranging the digits as ' + sorted.join(' → ') + ' gives <strong>' + ans + '</strong>.'
        });
    };

    const ch6_building_bank = bankGenerator('ch6_building', 'Ch-6: Building Numbers', [
        { q: 'Make the <strong>smallest</strong> 3-digit number using 0, 5 and 3 (no repeats).', ans: 305, wrong: [35, 350, 503], hint: '0 cannot be the first digit of a 3-digit number.', exp: 'Smallest non-zero digit first: 3, then 0, then 5 → 305.' },
        { q: 'Make the <strong>largest</strong> 3-digit number using 0, 4 and 7.', ans: 740, wrong: [704, 470, 407], hint: 'Biggest digit first, then next biggest.', exp: '7 > 4 > 0 → 740.' },
        { q: 'What is the largest 3-digit number where all digits are the <strong>same</strong>?', ans: 999, wrong: [888, 111, 900], hint: 'Use the biggest digit three times.', exp: '999 uses 9 three times.' },
        { q: 'The smallest 3-digit number with all <strong>different</strong> digits is...', ans: 102, wrong: [100, 111, 120], hint: 'Start with 1, then the next smallest digits.', exp: '1, 0, 2 → 102.' },
        { q: 'How many 3-digit numbers can be made from 1, 2 and 3 without repeating?', ans: 6, wrong: [3, 9, 4], hint: 'List them: 123, 132, 213, 231, 312, 321.', exp: 'There are 6 arrangements.' },
        { q: 'Using digits 8, 1, 6, what is the difference between the largest and smallest number formed?', ans: 693, wrong: [594, 792, 683], hint: 'Largest = 861, smallest = 168.', exp: '861 − 168 = 693.' }
    ]);

    /* --- Ch 7: Raksha Bandhan (Addition & Subtraction) ------------- */
    const ch7_raksha_proc = () => {
        const mode = pick(['add', 'sub', 'story']);
        if (mode === 'add') {
            const a = randInt(120, 480);
            const b = randInt(110, 460);
            return buildQuestion({
                topic: 'ch7_raksha',
                badge: 'Ch-7: Addition',
                q: 'Add: <strong>' + a + ' + ' + b + ' = ?</strong>',
                ans: a + b,
                wrong: [a + b + 10, a + b - 10, a + b + 100, Math.abs(a - b)],
                hint: 'Add ones first, then tens, then hundreds. Carry over when a column crosses 9.',
                exp: a + ' + ' + b + ' = <strong>' + (a + b) + '</strong>.'
            });
        }
        if (mode === 'sub') {
            const a = randInt(400, 950);
            const b = randInt(105, 395);
            return buildQuestion({
                topic: 'ch7_raksha',
                badge: 'Ch-7: Subtraction',
                q: 'Subtract: <strong>' + a + ' − ' + b + ' = ?</strong>',
                ans: a - b,
                wrong: [a - b + 10, a - b - 10, a + b, a - b + 100],
                hint: 'Subtract ones first. If the top digit is smaller, borrow from the next column.',
                exp: a + ' − ' + b + ' = <strong>' + (a - b) + '</strong>.'
            });
        }
        const rakhis = randInt(120, 350);
        const sold = randInt(40, 110);
        return buildQuestion({
            topic: 'ch7_raksha',
            badge: 'Ch-7: Raksha Bandhan Story Sum',
            q: 'A shop had <strong>' + rakhis + ' rakhis</strong>. On Raksha Bandhan it sold <strong>' + sold + '</strong> of them. How many rakhis are left?',
            visualSVG: '<div class="text-center text-3xl">🪢 🎁 🪢</div>',
            ans: rakhis - sold,
            wrong: [rakhis + sold, rakhis - sold + 10, rakhis - sold - 10, sold],
            hint: '"How many are left" means subtract.',
            exp: rakhis + ' − ' + sold + ' = <strong>' + (rakhis - sold) + '</strong> rakhis left.'
        });
    };

    const ch7_raksha_bank = bankGenerator('ch7_raksha', 'Ch-7: Add & Subtract', [
        { q: 'Which word tells you to <strong>add</strong>?', ans: 'Altogether', wrong: ['Left over', 'Fewer than', 'Take away'], hint: 'Think about combining amounts.', exp: '"Altogether", "in all", "total" mean addition.' },
        { q: 'Which word tells you to <strong>subtract</strong>?', ans: 'How many more', wrong: ['Sum of', 'Total', 'Altogether'], hint: 'Think about finding a difference.', exp: '"How many more/less/left" means subtraction.' },
        { q: 'What is 250 + 250?', ans: 500, wrong: [400, 550, 450], hint: 'Two lots of 250.', exp: '250 + 250 = 500.' },
        { q: 'What must be added to 460 to make 500?', ans: 40, wrong: [50, 30, 60], hint: '500 − 460 = ?', exp: '500 − 460 = 40.' },
        { q: 'Riya had ₹500. She spent ₹275 on gifts. How much is left?', ans: 225, wrong: [235, 325, 775], hint: 'Subtract the spending from the total.', exp: '500 − 275 = ₹225.' },
        { q: 'Four sisters each tie 3 rakhis on their brother\'s wrist. How many rakhis in all?', ans: 12, wrong: [7, 34, 43], hint: 'Repeated addition: 3 + 3 + 3 + 3.', exp: '4 × 3 = 12 rakhis.' },
        { q: 'Adding <strong>zero</strong> to any number gives...', ans: 'The same number', wrong: ['Zero', 'One more', 'Double'], hint: 'Zero adds nothing.', exp: 'n + 0 = n.' },
        { q: 'Subtracting a number from <strong>itself</strong> gives...', ans: 0, wrong: [1, 'The number itself', 'Double the number'], hint: 'Nothing remains.', exp: 'n − n = 0.' }
    ]);

    /* --- Ch 8: Fair Share ------------------------------------------ */
    const ch8_fair_share_proc = () => {
        const perChild = randInt(2, 9);
        const children = randInt(2, 8);
        const total = perChild * children;
        const askEach = Math.random() > 0.5;

        if (askEach) {
            return buildQuestion({
                topic: 'ch8_fair_share',
                badge: 'Ch-8: Fair Share',
                q: '<strong>' + total + ' laddoos</strong> are shared equally among <strong>' + children + ' children</strong>. How many laddoos does each child get?',
                visualSVG: '<div class="text-center text-2xl">' + '🧒'.repeat(children) + '</div>',
                ans: perChild,
                wrong: [children, perChild + 1, perChild - 1, total],
                hint: 'Equal sharing means dividing the total by the number of children.',
                exp: total + ' ÷ ' + children + ' = <strong>' + perChild + '</strong> laddoos each.'
            });
        }

        return buildQuestion({
            topic: 'ch8_fair_share',
            badge: 'Ch-8: Fair Share',
            q: 'Each of <strong>' + children + ' children</strong> gets <strong>' + perChild + ' sweets</strong>. How many sweets were shared in total?',
            ans: total,
            wrong: [children + perChild, total + perChild, total - perChild, children],
            hint: 'Repeated addition: add ' + perChild + ' as many times as there are children.',
            exp: children + ' × ' + perChild + ' = <strong>' + total + '</strong> sweets.'
        });
    };

    const ch8_fair_share_bank = bankGenerator('ch8_fair_share', 'Ch-8: Fair Share', [
        { q: 'Sharing something into <strong>two equal parts</strong> gives each part called a...', ans: 'Half', wrong: ['Quarter', 'Third', 'Whole'], hint: '2 equal parts.', exp: 'Two equal parts → each is one half (1/2).' },
        { q: 'Sharing something into <strong>four equal parts</strong> gives each part called a...', ans: 'Quarter', wrong: ['Half', 'Third', 'Whole'], hint: '4 equal parts.', exp: 'Four equal parts → each is one quarter (1/4).' },
        { q: 'Half of 20 is...', ans: 10, wrong: [5, 15, 40], hint: '20 ÷ 2', exp: '20 ÷ 2 = 10.' },
        { q: 'A quarter of 20 is...', ans: 5, wrong: [10, 4, 15], hint: '20 ÷ 4', exp: '20 ÷ 4 = 5.' },
        { q: '12 chocolates shared equally between 2 friends. Each gets...', ans: 6, wrong: [4, 3, 12], hint: 'Divide by 2.', exp: '12 ÷ 2 = 6.' },
        { q: 'Which sharing is <strong>fair</strong>?', ans: 'Everyone gets the same amount', wrong: ['The oldest gets more', 'The tallest gets more', 'The first one gets everything'], hint: 'Fair means equal.', exp: 'Fair sharing means every share is equal.' },
        { q: '15 pencils are shared equally among 4 children. How many are left over?', ans: 3, wrong: [1, 2, 0], hint: '4 × 3 = 12, so 15 − 12 = ?', exp: 'Each gets 3 pencils (12 used), leaving 3 pencils over.' }
    ]);

    /* --- Ch 9: House of Hundreds II (4-digit / larger numbers) ----- */
    const ch9_hundreds2_proc = () => {
        const mode = pick(['makeThousand', 'place4', 'compare4']);
        if (mode === 'makeThousand') {
            const n = randInt(100, 990);
            return buildQuestion({
                topic: 'ch9_hundreds2',
                badge: 'Ch-9: House of Hundreds - II',
                q: 'How much must be added to <strong>' + n + '</strong> to make <strong>1000</strong>?',
                ans: 1000 - n,
                wrong: [1000 + n, 1000 - n + 10, 1000 - n - 10, n],
                hint: '1000 − ' + n + ' = ?',
                exp: '1000 − ' + n + ' = <strong>' + (1000 - n) + '</strong>.'
            });
        }
        if (mode === 'place4') {
            const th = randInt(1, 9), h = randInt(0, 9), t = randInt(0, 9), o = randInt(0, 9);
            const num = th * 1000 + h * 100 + t * 10 + o;
            return buildQuestion({
                topic: 'ch9_hundreds2',
                badge: 'Ch-9: 4-Digit Place Value',
                q: 'In the number <strong>' + num + '</strong>, what is the place value of the digit in the <strong>thousands</strong> place?',
                ans: th * 1000,
                wrong: [th, th * 100, h * 100, th * 10],
                hint: 'Thousands place value = digit × 1000.',
                exp: 'The thousands digit is ' + th + ', so its place value is <strong>' + (th * 1000) + '</strong>.'
            });
        }
        const a = randInt(1000, 9999);
        let b = randInt(1000, 9999);
        while (a === b) b = randInt(1000, 9999);
        return buildQuestion({
            topic: 'ch9_hundreds2',
            badge: 'Ch-9: Comparing 4-Digit Numbers',
            q: 'Which number is <strong>greater</strong>: <strong>' + a + '</strong> or <strong>' + b + '</strong>?',
            ans: Math.max(a, b),
            wrong: [Math.min(a, b), a + b, Math.abs(a - b)],
            hint: 'Compare the thousands digit first.',
            exp: Math.max(a, b) + ' is greater than ' + Math.min(a, b) + '.'
        });
    };

    const ch9_hundreds2_bank = bankGenerator('ch9_hundreds2', 'Ch-9: House of Hundreds - II', [
        { q: 'How many hundreds make one thousand?', ans: 10, wrong: [100, 1000, 5], hint: '100 × ? = 1000', exp: '10 hundreds = 1000.' },
        { q: 'What is the smallest 4-digit number?', ans: 1000, wrong: [999, 1111, 1001], hint: 'It comes right after the largest 3-digit number.', exp: '999 + 1 = 1000.' },
        { q: 'What is the largest 4-digit number?', ans: 9999, wrong: [9000, 9990, 10000], hint: 'All four digits are 9.', exp: '9999 is the largest 4-digit number.' },
        { q: 'How many tens make one hundred?', ans: 10, wrong: [100, 5, 20], hint: '10 × ? = 100', exp: '10 tens = 100.' },
        { q: '9 hundreds + 9 tens + 9 ones = ?', ans: 999, wrong: [909, 990, 27], hint: '900 + 90 + 9', exp: '900 + 90 + 9 = 999.' },
        { q: 'Which number comes just after 1099?', ans: 1100, wrong: [1090, 10910, 1199], hint: 'Add 1.', exp: '1099 + 1 = 1100.' }
    ]);

    /* --- Ch 10: Fun at the Fair (Money) ----------------------------- */
    const ch10_money_proc = () => {
        const mode = pick(['change', 'total', 'notes']);
        if (mode === 'change') {
            const paid = pick([50, 100, 200, 500]);
            const cost = randInt(11, paid - 5);
            return buildQuestion({
                topic: 'ch10_fair_fun',
                badge: 'Ch-10: Money & Change',
                q: 'A toy costs <strong>₹' + cost + '</strong>. You pay with a <strong>₹' + paid + ' note</strong>. How much change should you get back?',
                visualSVG: '<div class="text-center text-3xl">💵 ➔ 🧸</div>',
                ans: paid - cost,
                wrong: [paid + cost, paid - cost + 10, paid - cost - 10, cost],
                hint: 'Change = money given − price.',
                exp: '₹' + paid + ' − ₹' + cost + ' = <strong>₹' + (paid - cost) + '</strong>.'
            });
        }
        if (mode === 'total') {
            const a = randInt(15, 90), b = randInt(15, 90), c = randInt(5, 40);
            return buildQuestion({
                topic: 'ch10_fair_fun',
                badge: 'Ch-10: Money Total',
                q: 'At the fair, Aarav buys a balloon for <strong>₹' + a + '</strong>, a ride for <strong>₹' + b + '</strong> and candy for <strong>₹' + c + '</strong>. How much did he spend?',
                ans: a + b + c,
                wrong: [a + b, a + b + c + 10, a + b + c - 10, a + c],
                hint: 'Add all three amounts.',
                exp: '₹' + a + ' + ₹' + b + ' + ₹' + c + ' = <strong>₹' + (a + b + c) + '</strong>.'
            });
        }
        const note = pick([10, 20, 50, 100, 200, 500]);
        const count = randInt(2, 9);
        return buildQuestion({
            topic: 'ch10_fair_fun',
            badge: 'Ch-10: Counting Money',
            q: 'How much money is <strong>' + count + ' notes of ₹' + note + '</strong>?',
            ans: note * count,
            wrong: [note + count, note * count + note, note * count - note, note * (count + 1)],
            hint: 'Repeated addition: add ₹' + note + ' ' + count + ' times.',
            exp: count + ' × ₹' + note + ' = <strong>₹' + (note * count) + '</strong>.'
        });
    };

    const ch10_money_bank = bankGenerator('ch10_fair_fun', 'Ch-10: Fun at the Fair', [
        { q: 'How many <strong>50 paise</strong> coins make ₹1?', ans: 2, wrong: [4, 5, 10], hint: '50 + 50 = 100 paise.', exp: '2 × 50p = ₹1.' },
        { q: '₹1 is equal to how many paise?', ans: 100, wrong: [10, 50, 1000], hint: 'Just like 100 cm makes a metre.', exp: '₹1 = 100 paise.' },
        { q: 'Which of these Indian notes is <strong>NOT</strong> in use today?', ans: '₹1000 note', wrong: ['₹500 note', '₹200 note', '₹100 note'], hint: 'It was withdrawn in 2016.', exp: 'The ₹1000 note is no longer in circulation.' },
        { q: 'You have two ₹100 notes and one ₹50 note. How much money?', ans: 250, wrong: [150, 200, 350], hint: '100 + 100 + 50', exp: '₹250 in total.' },
        { q: 'An ice cream costs ₹35. How much do 3 ice creams cost?', ans: 105, wrong: [95, 115, 38], hint: '35 + 35 + 35', exp: '3 × 35 = ₹105.' },
        { q: 'Ravi has ₹80. A game ticket costs ₹95. How much <strong>more</strong> does he need?', ans: 15, wrong: [175, 25, 5], hint: '95 − 80', exp: 'He needs ₹15 more.' },
        { q: 'Which is worth <strong>more</strong>: five ₹10 notes or two ₹20 notes?', ans: 'Five ₹10 notes', wrong: ['Two ₹20 notes', 'They are equal', 'Cannot say'], hint: '5 × 10 vs 2 × 20.', exp: '₹50 is more than ₹40.' },
        { q: 'A shopkeeper gives ₹12 change from ₹50. What was the price?', ans: 38, wrong: [62, 48, 32], hint: '50 − 12', exp: 'The price was ₹38.' }
    ]);

    /* --- Ch 11: Filling and Lifting (capacity & weight) ------------- */
    const ch11_measure_bank = bankGenerator('ch11_measure', 'Ch-11: Filling & Lifting', [
        { q: 'Which unit is used to measure the <strong>weight</strong> of vegetables?', ans: 'Kilogram (kg)', wrong: ['Litre (l)', 'Metre (m)', 'Hour'], hint: 'Weight is measured on a balance.', exp: 'Weight uses kilograms and grams.' },
        { q: 'Which unit is used to measure <strong>milk</strong>?', ans: 'Litre (l)', wrong: ['Kilogram (kg)', 'Metre (m)', 'Gram (g)'], hint: 'Milk is a liquid — we measure how much it fills.', exp: 'Capacity of liquids is measured in litres and millilitres.' },
        { q: '1 kilogram = how many grams?', ans: 1000, wrong: [100, 10, 500], hint: 'Kilo means one thousand.', exp: '1 kg = 1000 g.' },
        { q: '1 litre = how many millilitres?', ans: 1000, wrong: [100, 10, 500], hint: 'Milli means one thousandth.', exp: '1 l = 1000 ml.' },
        { q: 'Half a kilogram is the same as...', ans: '500 grams', wrong: ['50 grams', '100 grams', '5000 grams'], hint: '1000 ÷ 2', exp: '½ kg = 500 g.' },
        { q: 'Which is <strong>heavier</strong>: 1 kg of cotton or 1 kg of iron?', ans: 'Both weigh the same', wrong: ['1 kg of iron', '1 kg of cotton', 'Cannot say'], hint: 'Read the amounts carefully!', exp: 'Both are exactly 1 kilogram — the same weight.' },
        { q: 'A bucket holds about how much water?', ans: '10 litres', wrong: ['10 millilitres', '1 millilitre', '100 litres'], hint: 'Think of a normal household bucket.', exp: 'A typical bucket holds around 10 litres.' },
        { q: 'A spoon holds about how much medicine?', ans: '5 millilitres', wrong: ['5 litres', '500 millilitres', '1 litre'], hint: 'A teaspoon is tiny.', exp: 'A teaspoon holds about 5 ml.' },
        { q: 'Which instrument is used to weigh things?', ans: 'Weighing balance', wrong: ['Measuring jug', 'Ruler', 'Clock'], hint: 'It has two pans or a digital display.', exp: 'A weighing balance measures weight.' },
        { q: '2 litres of juice is poured equally into 4 glasses. How much in each glass?', ans: '500 ml', wrong: ['200 ml', '2 litres', '250 ml'], hint: '2000 ml ÷ 4', exp: '2000 ÷ 4 = 500 ml per glass.' }
    ]);

    /* --- Ch 12: How Many Times? (Multiplication) -------------------- */
    const ch12_times_proc = () => {
        const a = randInt(2, 10);
        const b = randInt(2, 10);
        const mode = pick(['product', 'repeated', 'story']);

        if (mode === 'product') {
            return buildQuestion({
                topic: 'ch12_times',
                badge: 'Ch-12: Multiplication Tables',
                q: 'What is <strong>' + a + ' × ' + b + '</strong>?',
                ans: a * b,
                wrong: [a + b, a * b + a, a * b - a, a * b + b],
                hint: 'Multiplication is repeated addition: add ' + a + ' to itself ' + b + ' times.',
                exp: a + ' × ' + b + ' = <strong>' + (a * b) + '</strong>.'
            });
        }

        if (mode === 'repeated') {
            const chain = new Array(b).fill(a).join(' + ');
            return buildQuestion({
                topic: 'ch12_times',
                badge: 'Ch-12: Repeated Addition',
                q: 'Which multiplication matches this sum?<br><strong>' + chain + '</strong>',
                ans: a + ' × ' + b + ' = ' + (a * b),
                // Off-by-one on the count is the real misconception here.
                wrong: [
                    a + ' × ' + (b + 1) + ' = ' + (a * (b + 1)),
                    (a + 1) + ' × ' + b + ' = ' + ((a + 1) * b),
                    a + ' + ' + b + ' = ' + (a + b)
                ],
                hint: 'Count how many times <strong>' + a + '</strong> is written, then multiply.',
                exp: a + ' is added ' + b + ' times, so ' + a + ' × ' + b + ' = ' + (a * b) + '.'
            });
        }

        const things = pick([
            { item: 'ladoos', box: 'boxes' },
            { item: 'pencils', box: 'packets' },
            { item: 'eggs', box: 'trays' },
            { item: 'mangoes', box: 'baskets' }
        ]);
        return buildQuestion({
            topic: 'ch12_times',
            badge: 'Ch-12: Multiplication Story',
            q: 'There are <strong>' + b + ' ' + things.box + '</strong> and each holds <strong>' + a + ' ' + things.item + '</strong>. How many ' + things.item + ' in all?',
            ans: a * b,
            wrong: [a + b, a * b + b, a * b - b, a * (b + 1)],
            hint: '"Each" and "in all" together mean multiply.',
            exp: b + ' × ' + a + ' = <strong>' + (a * b) + '</strong> ' + things.item + '.'
        });
    };

    const ch12_times_bank = bankGenerator('ch12_times', 'Ch-12: How Many Times?', [
        { q: 'Any number multiplied by <strong>1</strong> gives...', ans: 'The same number', wrong: ['1', '0', 'Double the number'], hint: 'One group of the number.', exp: 'n × 1 = n.' },
        { q: 'Any number multiplied by <strong>0</strong> gives...', ans: 0, wrong: [1, 'The same number', 10], hint: 'Zero groups means nothing.', exp: 'n × 0 = 0.' },
        { q: 'What is 10 × 10?', ans: 100, wrong: [20, 110, 1000], hint: 'Ten tens.', exp: '10 × 10 = 100.' },
        { q: 'A week has 7 days. How many days in 5 weeks?', ans: 35, wrong: [12, 30, 42], hint: '7 × 5', exp: '5 × 7 = 35 days.' },
        { q: 'How many legs do 6 cows have?', ans: 24, wrong: [12, 18, 30], hint: 'Each cow has 4 legs.', exp: '6 × 4 = 24 legs.' },
        { q: 'How many wheels do 8 bicycles have?', ans: 16, wrong: [8, 24, 32], hint: 'Each bicycle has 2 wheels.', exp: '8 × 2 = 16 wheels.' },
        { q: 'Is 4 × 5 the same as 5 × 4?', ans: 'Yes, both equal 20', wrong: ['No, 4 × 5 is bigger', 'No, 5 × 4 is bigger', 'They cannot be compared'], hint: 'Order does not change a product.', exp: 'Multiplication can be done in any order: both give 20.' },
        { q: 'A dozen means how many?', ans: 12, wrong: [10, 20, 6], hint: 'Eggs are often sold this way.', exp: '1 dozen = 12.' },
        { q: 'What is 3 dozen bananas?', ans: 36, wrong: [15, 24, 30], hint: '3 × 12', exp: '3 × 12 = 36 bananas.' }
    ]);

    /* --- Ch 13: Sharing Equally (Division) ------------------------- */
    const ch13_sharing_proc = () => {
        const divisor = randInt(2, 9);
        const quotient = randInt(2, 9);
        const dividend = divisor * quotient;
        const withRemainder = Math.random() > 0.6;

        if (withRemainder) {
            const rem = randInt(1, divisor - 1);
            return buildQuestion({
                topic: 'ch13_sharing',
                badge: 'Ch-13: Division with Remainder',
                q: '<strong>' + (dividend + rem) + ' toffees</strong> are shared equally among <strong>' + divisor + ' children</strong>. How many toffees are <strong>left over</strong>?',
                ans: rem,
                wrong: [quotient, divisor, rem + 1, 0],
                hint: 'Share out as many full rounds as possible; whatever cannot be shared is the remainder.',
                exp: 'Each child gets ' + quotient + ' toffees (' + dividend + ' used) and <strong>' + rem + '</strong> are left over.'
            });
        }

        return buildQuestion({
            topic: 'ch13_sharing',
            badge: 'Ch-13: Sharing Equally',
            q: 'What is <strong>' + dividend + ' ÷ ' + divisor + '</strong>?',
            ans: quotient,
            wrong: [divisor, quotient + 1, quotient - 1, dividend],
            hint: 'Ask: how many groups of ' + divisor + ' fit into ' + dividend + '?',
            exp: divisor + ' × ' + quotient + ' = ' + dividend + ', so ' + dividend + ' ÷ ' + divisor + ' = <strong>' + quotient + '</strong>.'
        });
    };

    const ch13_sharing_bank = bankGenerator('ch13_sharing', 'Ch-13: Sharing Equally', [
        { q: 'Division is the <strong>opposite</strong> of which operation?', ans: 'Multiplication', wrong: ['Addition', 'Subtraction', 'Counting'], hint: '3 × 4 = 12 so 12 ÷ 4 = 3.', exp: 'Division undoes multiplication.' },
        { q: 'Any number divided by <strong>1</strong> gives...', ans: 'The same number', wrong: ['1', '0', 'Double'], hint: 'One group holds everything.', exp: 'n ÷ 1 = n.' },
        { q: 'Any number divided by <strong>itself</strong> gives...', ans: 1, wrong: [0, 'The number', 2], hint: 'Exactly one group.', exp: 'n ÷ n = 1.' },
        { q: '20 ÷ 5 = ?', ans: 4, wrong: [5, 15, 25], hint: '5 × ? = 20', exp: '5 × 4 = 20, so 20 ÷ 5 = 4.' },
        { q: '36 ÷ 6 = ?', ans: 6, wrong: [5, 7, 30], hint: '6 × ? = 36', exp: '6 × 6 = 36.' },
        { q: '17 pens shared among 5 friends. How many does each get and how many are left?', ans: '3 each, 2 left', wrong: ['2 each, 7 left', '4 each, 1 left', '3 each, 1 left'], hint: '5 × 3 = 15, so 17 − 15 = 2.', exp: 'Each gets 3 pens and 2 pens remain.' },
        { q: 'In 24 ÷ 4 = 6, what is 24 called?', ans: 'Dividend', wrong: ['Divisor', 'Quotient', 'Remainder'], hint: 'It is the number being shared.', exp: '24 is the dividend, 4 the divisor and 6 the quotient.' },
        { q: '45 chairs are arranged in 9 equal rows. How many chairs in each row?', ans: 5, wrong: [4, 6, 9], hint: '45 ÷ 9', exp: '45 ÷ 9 = 5 chairs per row.' }
    ]);

    /* --- Ch 14: Fun with Give and Take (mixed word problems) -------- */
    const ch14_give_take_bank = bankGenerator('ch14_give_take', 'Ch-14: Give and Take', [
        { q: 'A library had 348 books. 126 more were added. How many books now?', ans: 474, wrong: [222, 464, 484], hint: 'Add the two amounts.', exp: '348 + 126 = 474 books.' },
        { q: 'A bus had 52 passengers. 18 got off and 25 got on. How many are in the bus now?', ans: 59, wrong: [45, 95, 35], hint: 'Subtract first, then add.', exp: '52 − 18 = 34; 34 + 25 = 59.' },
        { q: 'A farmer had 500 kg of wheat. He sold 275 kg. How much is left?', ans: 225, wrong: [275, 325, 775], hint: 'Subtract.', exp: '500 − 275 = 225 kg.' },
        { q: 'Two classes have 34 and 29 students. How many students altogether?', ans: 63, wrong: [53, 5, 73], hint: 'Add.', exp: '34 + 29 = 63 students.' },
        { q: 'Sita read 45 pages on Monday and 38 on Tuesday. How many <strong>more</strong> did she read on Monday?', ans: 7, wrong: [83, 17, 3], hint: 'Find the difference.', exp: '45 − 38 = 7 pages more.' },
        { q: 'A shop sold 120 ice creams on Saturday and twice as many on Sunday. Sunday sales?', ans: 240, wrong: [122, 60, 360], hint: 'Twice means multiply by 2.', exp: '120 × 2 = 240.' },
        { q: 'Estimate: 198 + 302 is closest to...', ans: 500, wrong: [400, 600, 450], hint: 'Round 198 to 200 and 302 to 300.', exp: '200 + 300 = 500.' },
        { q: 'The sum of the smallest and largest 3-digit numbers is...', ans: 1099, wrong: [999, 1000, 1098], hint: '100 + 999', exp: '100 + 999 = 1099.' }
    ]);

    const mathGenerators = {
        ch1_names: mix(ch1_names_proc, ch1_names_bank),
        ch2_toys: mix(ch2_toys_proc, ch2_toys_bank),
        ch3_century: mix(ch3_century_proc, ch3_century_bank),
        ch4_shapes: mix(ch4_shapes_proc, ch4_shapes_bank),
        ch4_lines: mix(ch4_lines_proc, ch4_lines_bank),
        ch4_paths: mix(ch4_paths_proc, ch4_paths_bank),
        ch4_spans: mix(ch4_spans_proc, ch4_spans_bank),
        ch5_shapes_fun: mix(ch5_shapes_fun_proc, ch5_shapes_fun_bank),
        ch6_placeval: mix(ch6_placeval_proc, ch6_placeval_bank),
        ch6_expanded: ch6_expanded_proc,
        ch6_words: ch6_words_proc,
        ch6_compare: mix(ch6_compare_proc, ch6_compare_bank),
        ch6_patterns: mix(ch6_patterns_proc, ch6_patterns_bank),
        ch6_building: mix(ch6_building_proc, ch6_building_bank),
        ch7_raksha: mix(ch7_raksha_proc, ch7_raksha_bank),
        ch8_fair_share: mix(ch8_fair_share_proc, ch8_fair_share_bank),
        ch9_hundreds2: mix(ch9_hundreds2_proc, ch9_hundreds2_bank),
        ch10_fair_fun: mix(ch10_money_proc, ch10_money_bank),
        ch11_measure: ch11_measure_bank,
        ch12_times: mix(ch12_times_proc, ch12_times_bank),
        ch13_sharing: mix(ch13_sharing_proc, ch13_sharing_bank),
        ch14_give_take: ch14_give_take_bank
    };

    /* ===============================================================
     * Extra practice-paper questions
     * Modelled on the exercises and worksheet/exam patterns used with
     * Math Mela. Merged into the chapters defined above.
     * =============================================================== */
    const PAPER = {
        ch1_names: [
            { q: 'Which name has the <strong>fewest letters</strong>?', ans: 'Ravi', wrong: ['Ananya', 'Devansh', 'Tanisha'], hint: 'Count the letters in each name.', exp: 'Ravi has 4 letters — the fewest here.' },
            { q: 'How many letters are in the word <strong>SCHOOL</strong>?', ans: 6, wrong: [5, 7, 4], hint: 'S-C-H-O-O-L', exp: 'SCHOOL has 6 letters.' },
            { q: 'In the word <strong>BANANA</strong>, which letter comes most often?', ans: 'A', wrong: ['B', 'N', 'All the same'], hint: 'B-A-N-A-N-A', exp: 'A appears 3 times, N appears 2 times, B once.' },
            { q: 'If Meena writes her name 3 times, how many letters does she write in all? (MEENA = 5 letters)', ans: 15, wrong: [8, 10, 20], hint: '5 + 5 + 5', exp: '3 × 5 = 15 letters.' },
            { q: 'Which of these names begins with a <strong>vowel</strong>?', ans: 'Aarav', wrong: ['Kabir', 'Rohan', 'Meera'], hint: 'Vowels are a, e, i, o, u.', exp: 'Aarav begins with A, a vowel.' },
            { q: 'Arrange by length (shortest first): OM, RAVI, ANANYA. Which is in the middle?', ans: 'RAVI', wrong: ['OM', 'ANANYA', 'All equal'], hint: '2 letters, 4 letters, 6 letters.', exp: 'OM (2) < RAVI (4) < ANANYA (6).' },
            { q: 'How many <strong>consonants</strong> are in the name <strong>KABIR</strong>?', ans: 3, wrong: [2, 4, 5], hint: 'Vowels in KABIR are A and I.', exp: 'K, B, R are consonants → 3.' }
        ],
        ch2_toys: [
            { q: 'How many tens and ones are in <strong>73</strong>?', ans: '7 tens and 3 ones', wrong: ['3 tens and 7 ones', '7 tens and 0 ones', '73 tens'], hint: 'The first digit shows tens.', exp: '73 = 70 + 3 = 7 tens and 3 ones.' },
            { q: '5 tens + 9 ones = ?', ans: 59, wrong: [95, 14, 509], hint: '50 + 9', exp: '5 tens = 50, plus 9 ones = 59.' },
            { q: 'A box holds 10 crayons. How many boxes are needed for 60 crayons?', ans: 6, wrong: [5, 7, 60], hint: '10 × ? = 60', exp: '60 ÷ 10 = 6 boxes.' },
            { q: 'Which number has <strong>more tens</strong>: 48 or 84?', ans: 84, wrong: [48, 'Both same', 'Cannot say'], hint: 'Compare the first digit.', exp: '84 has 8 tens, 48 has only 4 tens.' },
            { q: 'Rita counted her marbles in groups of ten and had 4 groups with 6 left. How many marbles?', ans: 46, wrong: [64, 10, 406], hint: '4 tens + 6 ones', exp: '40 + 6 = 46 marbles.' },
            { q: 'What is 1 more than 79?', ans: 80, wrong: [78, 89, 70], hint: 'Add one.', exp: '79 + 1 = 80.' },
            { q: 'What is 10 more than 45?', ans: 55, wrong: [46, 35, 145], hint: 'Add one ten.', exp: '45 + 10 = 55.' }
        ],
        ch3_century: [
            { q: 'Which number is a <strong>century</strong>?', ans: 100, wrong: [50, 200, 10], hint: 'A century is 100.', exp: 'A century means 100 runs.' },
            { q: 'A player is on 87. How many runs to a century?', ans: 13, wrong: [23, 3, 113], hint: '100 − 87', exp: '100 − 87 = 13 runs.' },
            { q: 'Count in fifties: 50, 100, 150, ___', ans: 200, wrong: [160, 175, 250], hint: 'Add 50.', exp: '150 + 50 = 200.' },
            { q: 'Which is greater: 2 half-centuries or 1 century?', ans: 'They are equal', wrong: ['2 half-centuries', '1 century', 'Cannot say'], hint: '50 + 50 = ?', exp: '50 + 50 = 100 = one century.' },
            { q: 'Ravi scored 45 and Sita scored 55. Did they together make a century?', ans: 'Yes, exactly 100', wrong: ['No, 90 only', 'No, 110', 'Cannot say'], hint: '45 + 55', exp: '45 + 55 = 100 — exactly a century.' },
            { q: 'How many runs is a <strong>triple century</strong>?', ans: 300, wrong: [200, 250, 3000], hint: 'Triple means three times 100.', exp: '3 × 100 = 300 runs.' }
        ],
        ch4_shapes: [
            { q: 'How many sides does a <strong>hexagon</strong> have?', ans: 6, wrong: [5, 7, 8], hint: 'Hexa means six.', exp: 'A hexagon has 6 sides.' },
            { q: 'Which shape has no straight sides?', ans: 'Circle', wrong: ['Square', 'Triangle', 'Pentagon'], hint: 'It is completely round.', exp: 'A circle has one curved boundary and no straight sides.' },
            { q: 'A shape with 4 sides is called a...', ans: 'Quadrilateral', wrong: ['Triangle', 'Pentagon', 'Hexagon'], hint: 'Quad means four.', exp: 'Any 4-sided shape is a quadrilateral.' },
            { q: 'How many corners does a rectangle have?', ans: 4, wrong: [2, 3, 6], hint: 'Think of a book cover.', exp: 'A rectangle has 4 corners.' },
            { q: 'The blackboard in your class is shaped like a...', ans: 'Rectangle', wrong: ['Circle', 'Triangle', 'Pentagon'], hint: 'Longer than it is tall, 4 corners.', exp: 'A blackboard is a rectangle.' },
            { q: 'Which shape has all sides equal AND 4 corners?', ans: 'Square', wrong: ['Rectangle', 'Triangle', 'Oval'], hint: 'Every side is the same length.', exp: 'A square has 4 equal sides and 4 corners.' },
            { q: 'A 50-paise coin is shaped like a...', ans: 'Circle', wrong: ['Square', 'Triangle', 'Hexagon'], hint: 'Coins are round.', exp: 'Coins are circular.' },
            { q: 'How many triangles can you see in a square cut along one diagonal?', ans: 2, wrong: [1, 3, 4], hint: 'One cut corner to corner.', exp: 'One diagonal splits a square into 2 triangles.' },
            { q: 'Look at the picture. How many <strong>triangles</strong> are shown?', visual: '<svg class="w-56 h-24 mx-auto" viewBox="0 0 280 120" role="img" aria-label="Three triangles and one circle"><polygon points="45,100 85,25 125,100" fill="#fde68a" stroke="#b45309" stroke-width="4"/><polygon points="105,100 145,25 185,100" fill="#bfdbfe" stroke="#2563eb" stroke-width="4"/><polygon points="165,100 205,25 245,100" fill="#bbf7d0" stroke="#15803d" stroke-width="4"/><circle cx="265" cy="65" r="25" fill="#fbcfe8" stroke="#be185d" stroke-width="4"/></svg>', ans: 3, wrong: [2, 4, 5], hint: 'Count only the shapes with three straight sides.', exp: 'There are 3 triangles in the picture.' }
        ],
        ch4_lines: [
            { q: 'Which of these is a <strong>curved</strong> line?', ans: 'The edge of a bangle', wrong: ['The edge of a ruler', 'The edge of a book', 'The edge of a table'], hint: 'It bends smoothly all round.', exp: 'A bangle has a curved edge.' },
            { q: 'A line that goes side to side is called...', ans: 'Horizontal', wrong: ['Vertical', 'Slanting', 'Curved'], hint: 'Like the horizon.', exp: 'Side-to-side lines are horizontal.' },
            { q: 'A line that goes straight up and down is called...', ans: 'Vertical', wrong: ['Horizontal', 'Curved', 'Zig-zag'], hint: 'Like a standing pole.', exp: 'Up-and-down lines are vertical.' },
            { q: 'Which object has both straight and curved edges?', ans: 'A half chapati', wrong: ['A full chapati', 'A postcard', 'A notebook'], hint: 'Cut a circle in half.', exp: 'A semi-circle has one straight edge and one curved edge.' },
            { q: 'How many straight edges does a triangle have?', ans: 3, wrong: [2, 4, 1], hint: 'Count the sides.', exp: 'A triangle has 3 straight edges.' },
            { q: 'In the picture, which labelled line is <strong>curved</strong>?', visual: '<svg class="w-56 h-24 mx-auto" viewBox="0 0 280 120" role="img" aria-label="Line A horizontal, line B curved, line C zig-zag"><text x="15" y="25" font-size="18" font-weight="bold">A</text><line x1="40" y1="20" x2="120" y2="20" stroke="#2563eb" stroke-width="5"/><text x="15" y="67" font-size="18" font-weight="bold">B</text><path d="M40 65 Q80 20 120 65" fill="none" stroke="#db2777" stroke-width="5"/><text x="155" y="25" font-size="18" font-weight="bold">C</text><polyline points="180,20 205,55 230,20 255,55" fill="none" stroke="#16a34a" stroke-width="5"/></svg>', ans: 'B', wrong: ['A', 'C', 'A and C'], hint: 'A curved line bends smoothly without sharp corners.', exp: 'Line B bends smoothly, so it is the curved line.' }
        ],
        ch4_paths: [
            { q: 'Which direction is <strong>opposite</strong> to North?', ans: 'South', wrong: ['East', 'West', 'North-East'], hint: 'Think of a compass.', exp: 'North and South are opposite.' },
            { q: 'A child walks 3 steps forward and 3 steps back. Where is the child now?', ans: 'At the starting place', wrong: ['3 steps ahead', '6 steps ahead', '3 steps behind'], hint: 'The two moves cancel out.', exp: 'Going forward then back the same amount returns you to the start.' },
            { q: 'On a grid, Riya moves 2 right and 3 up, then 1 right. How many moves in all?', ans: 6, wrong: [5, 7, 4], hint: '2 + 3 + 1', exp: '2 + 3 + 1 = 6 moves.' },
            { q: 'If you face South, which direction is behind you?', ans: 'North', wrong: ['East', 'West', 'South'], hint: 'Behind means the opposite side.', exp: 'The opposite of South is North.' },
            { q: 'The school is 6 blocks away. Ravi has walked 4 blocks. How many more?', ans: 2, wrong: [10, 3, 1], hint: '6 − 4', exp: 'He needs 2 more blocks.' },
            { q: 'The frog starts at 7 and jumps forward by 10 on the number line. Where does it land?', visual: '<svg class="w-72 h-20 mx-auto" viewBox="0 0 360 90" role="img" aria-label="Number line from 0 to 30 with a jump from 7 to 17"><line x1="25" y1="48" x2="335" y2="48" stroke="#334155" stroke-width="3"/><path d="M25 42v12 M77 42v12 M128 42v12 M180 42v12 M232 42v12 M283 42v12 M335 42v12" stroke="#334155" stroke-width="3"/><text x="20" y="75" font-size="16">0</text><text x="70" y="75" font-size="16">5</text><text x="120" y="75" font-size="16">10</text><text x="171" y="75" font-size="16">15</text><text x="222" y="75" font-size="16">20</text><text x="273" y="75" font-size="16">25</text><text x="325" y="75" font-size="16">30</text><path d="M98 30 Q155 0 200 30" fill="none" stroke="#ea580c" stroke-width="4" marker-end="url(#arrow)"/><defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#ea580c"/></marker></defs></svg>', ans: 17, wrong: [27, 10, 7], hint: 'A forward jump of 10 means add 10 to 7.', exp: '7 + 10 = 17, so the frog lands on 17.' }
        ],
        ch4_spans: [
            { q: 'Which is the <strong>shortest</strong> unit?', ans: 'Fingerwidth', wrong: ['Handspan', 'Cubit', 'Pace'], hint: 'It uses just one finger.', exp: 'A fingerwidth is the smallest of these.' },
            { q: 'A desk is 6 handspans long. Which is a sensible length in handspans for a pencil?', ans: '1 handspan', wrong: ['6 handspans', '12 handspans', '20 handspans'], hint: 'A pencil is much shorter than a desk.', exp: 'A pencil is about one handspan long.' },
            { q: 'Two children measure the same wall. Aman says 12 paces, Bina says 15 paces. Whose steps are longer?', ans: 'Aman\'s', wrong: ['Bina\'s', 'Both equal', 'Cannot say'], hint: 'Fewer steps means longer steps.', exp: 'Aman needed fewer paces, so his pace is longer.' },
            { q: 'Which unit would you use to measure the length of a cricket pitch?', ans: 'Paces or metres', wrong: ['Fingerwidths', 'Handspans', 'Grams'], hint: 'It is a long distance.', exp: 'Long distances use paces or metres.' },
            { q: 'Why is a ruler better than a handspan for measuring?', ans: 'A ruler is the same for everyone', wrong: ['A ruler is prettier', 'A ruler is longer', 'A handspan is illegal'], hint: 'Everyone\'s hand is a different size.', exp: 'Standard units give the same answer for everyone.' },
            { q: 'The picture shows 18 seeds in all and 11 seeds on the table. How many seeds are hidden?', visual: '<div class="text-center text-xl" role="img" aria-label="18 total seeds, 11 visible seeds, hidden seeds unknown"><div class="mb-2"><span class="inline-block rounded border-2 border-amber-700 bg-amber-100 px-3 py-1 font-bold">Total: 18</span><span class="mx-2">−</span><span class="inline-block rounded border-2 border-green-700 bg-green-100 px-3 py-1 font-bold">On table: 11</span></div><div class="tracking-widest">🌰 🌰 🌰 🌰 🌰 🌰 🌰 🌰 🌰 🌰 🌰 &nbsp; ?</div></div>', ans: 7, wrong: [6, 8, 29], hint: 'Hidden seeds = total seeds − seeds on the table.', exp: '18 − 11 = 7 hidden seeds.' }
        ],
        ch5_shapes_fun: [
            { q: 'How many faces does a <strong>cuboid</strong> have?', ans: 6, wrong: [4, 8, 12], hint: 'Think of a matchbox.', exp: 'A cuboid has 6 flat faces.' },
            { q: 'Which object is shaped like a <strong>cylinder</strong>?', ans: 'A tin of biscuits', wrong: ['A football', 'A dice', 'An ice-cream cone'], hint: 'Two flat circles and a curved side.', exp: 'A tin is a cylinder.' },
            { q: 'Which object is shaped like a <strong>cone</strong>?', ans: 'A birthday hat', wrong: ['A book', 'A ball', 'A brick'], hint: 'Round at the bottom, pointy at the top.', exp: 'A party hat is a cone.' },
            { q: 'Which shape will <strong>not</strong> roll?', ans: 'Cube', wrong: ['Sphere', 'Cylinder', 'Cone'], hint: 'It has only flat faces.', exp: 'A cube has no curved surface, so it only slides.' },
            { q: 'How many lines of symmetry does a <strong>circle</strong> have?', ans: 'Countless (very many)', wrong: ['1', '2', '4'], hint: 'Fold it any way through the centre.', exp: 'Every line through the centre of a circle is a line of symmetry.' },
            { q: 'A butterfly\'s wings show...', ans: 'Symmetry', wrong: ['No pattern', 'Only curves', 'Only corners'], hint: 'Both halves match.', exp: 'A butterfly is symmetrical.' },
            { q: 'Which shape has 3 faces (2 flat, 1 curved)?', ans: 'Cylinder', wrong: ['Cube', 'Sphere', 'Cone'], hint: 'Like a tin can.', exp: 'A cylinder has 2 flat circles and 1 curved surface.' }
        ],
        ch6_placeval: [
            { q: 'What is the place value of 5 in <strong>253</strong>?', ans: 50, wrong: [5, 500, 3], hint: '5 is in the tens place.', exp: '5 tens = 50.' },
            { q: 'What is the place value of 9 in <strong>907</strong>?', ans: 900, wrong: [9, 90, 7], hint: '9 is in the hundreds place.', exp: '9 hundreds = 900.' },
            { q: 'In 468, which digit has the <strong>smallest</strong> place value?', ans: 8, wrong: [4, 6, 'All equal'], hint: 'The ones place is worth the least.', exp: '8 is in the ones place with place value 8.' },
            { q: 'The sum of the place values of the digits in 305 is...', ans: 305, wrong: [8, 35, 350], hint: '300 + 0 + 5', exp: '300 + 0 + 5 = 305.' },
            { q: 'A number has 4 hundreds, 0 tens and 7 ones. What is it?', ans: 407, wrong: [470, 47, 740], hint: 'Write the digits in order.', exp: '4 hundreds, 0 tens, 7 ones → 407.' },
            { q: 'In 555, are all three 5s worth the same?', ans: 'No — 500, 50 and 5', wrong: ['Yes, all are 5', 'Yes, all are 500', 'Only two are the same'], hint: 'Place value depends on position.', exp: 'The 5s stand for 500, 50 and 5.' }
        ],
        ch6_expanded: [
            { q: 'Write 706 in expanded form.', ans: '700 + 0 + 6', wrong: ['700 + 6 + 0 tens only', '70 + 0 + 6', '7 + 0 + 6'], hint: 'Hundreds + tens + ones.', exp: '706 = 700 + 0 + 6.' },
            { q: '400 + 90 + 5 = ?', ans: 495, wrong: [459, 945, 4905], hint: 'Add the parts.', exp: '400 + 90 + 5 = 495.' },
            { q: '600 + 0 + 3 = ?', ans: 603, wrong: [630, 63, 6003], hint: 'There are no tens.', exp: '600 + 3 = 603.' },
            { q: 'Which number has <strong>no tens</strong>?', ans: 805, wrong: [850, 885, 815], hint: 'The middle digit is 0.', exp: 'In 805 the tens digit is 0.' }
        ],
        ch6_words: [
            { q: 'Write <strong>Four Hundred and Sixteen</strong> in figures.', ans: 416, wrong: [461, 4016, 460], hint: '4 hundreds, 1 ten, 6 ones.', exp: 'Four Hundred and Sixteen = 416.' },
            { q: 'Write <strong>Nine Hundred and Nine</strong> in figures.', ans: 909, wrong: [990, 99, 919], hint: 'There are no tens.', exp: 'Nine Hundred and Nine = 909.' },
            { q: 'How do we say <strong>250</strong>?', ans: 'Two Hundred and Fifty', wrong: ['Twenty Five Zero', 'Two Fifty Hundred', 'Two Hundred and Five'], hint: 'Hundreds first, then the rest.', exp: '250 = Two Hundred and Fifty.' },
            { q: 'Which number is <strong>Six Hundred and Four</strong>?', ans: 604, wrong: [640, 64, 6004], hint: 'No tens in this number.', exp: 'Six Hundred and Four = 604.' }
        ],
        ch6_compare: [
            { q: 'Put in ascending order: 320, 230, 302', ans: '230, 302, 320', wrong: ['320, 302, 230', '302, 320, 230', '230, 320, 302'], hint: 'Ascending means smallest first.', exp: '230 < 302 < 320.' },
            { q: 'Put in descending order: 105, 150, 115', ans: '150, 115, 105', wrong: ['105, 115, 150', '115, 150, 105', '150, 105, 115'], hint: 'Descending means biggest first.', exp: '150 > 115 > 105.' },
            { q: 'Which sign goes here: 678 ___ 687?', ans: '&lt; (Less than)', wrong: ['&gt; (Greater than)', '= (Equal to)', 'Cannot compare'], hint: 'Hundreds are equal; compare tens: 7 vs 8.', exp: '678 is less than 687.' },
            { q: 'How many numbers lie between 199 and 203?', ans: 3, wrong: [2, 4, 5], hint: 'List them: 200, 201, 202.', exp: '200, 201 and 202 → 3 numbers.' },
            { q: 'Which is the greatest: 707, 770, 777?', ans: 777, wrong: [707, 770, 'All equal'], hint: 'Compare tens, then ones.', exp: '777 is the greatest.' }
        ],
        ch6_patterns: [
            { q: 'Complete: 5, 10, 15, 20, 25, ___', ans: 30, wrong: [26, 35, 20], hint: 'Counting in fives.', exp: '25 + 5 = 30.' },
            { q: 'Complete: 100, 90, 80, ___', ans: 70, wrong: [75, 60, 85], hint: 'Counting back in tens.', exp: '80 − 10 = 70.' },
            { q: 'Complete: 3, 6, 9, 12, ___', ans: 15, wrong: [13, 14, 16], hint: 'The 3 times table.', exp: '12 + 3 = 15.' },
            { q: 'Which number is <strong>even</strong>?', ans: 314, wrong: [313, 315, 317], hint: 'Even numbers end in 0, 2, 4, 6 or 8.', exp: '314 ends in 4, so it is even.' },
            { q: 'What comes next: 25, 50, 75, ___?', ans: 100, wrong: [80, 95, 125], hint: 'Counting in twenty-fives.', exp: '75 + 25 = 100.' },
            { q: 'Complete the pattern: 🔺🔵🔺🔵🔺___', ans: '🔵', wrong: ['🔺', '🟩', '⭐'], hint: 'The two shapes take turns.', exp: 'The pattern repeats triangle, circle.' }
        ],
        ch6_building: [
            { q: 'Using 2, 7 and 5, what is the largest number?', ans: 752, wrong: [275, 572, 725], hint: 'Biggest digit first.', exp: '7 > 5 > 2 → 752.' },
            { q: 'Using 2, 7 and 5, what is the smallest number?', ans: 257, wrong: [275, 527, 752], hint: 'Smallest digit first.', exp: '2 < 5 < 7 → 257.' },
            { q: 'Which digit cannot be first in a 3-digit number?', ans: 0, wrong: [1, 5, 9], hint: '0 first would make it a 2-digit number.', exp: 'A 3-digit number cannot start with 0.' },
            { q: 'What is the largest 3-digit even number?', ans: 998, wrong: [999, 988, 996], hint: 'It must end in an even digit.', exp: '998 is the largest 3-digit even number.' },
            { q: 'What is the smallest 3-digit odd number?', ans: 101, wrong: [100, 111, 103], hint: 'It must end in an odd digit.', exp: '101 is the smallest 3-digit odd number.' }
        ],
        ch7_raksha: [
            { q: '234 + 158 = ?', ans: 392, wrong: [382, 392 + 10, 76], hint: 'Add ones, then tens, then hundreds.', exp: '234 + 158 = 392.' },
            { q: '506 − 248 = ?', ans: 258, wrong: [268, 348, 754], hint: 'Borrow from the next column.', exp: '506 − 248 = 258.' },
            { q: 'A shop had 420 rakhis and made 175 more. How many now?', ans: 595, wrong: [245, 585, 605], hint: '"More" means add.', exp: '420 + 175 = 595.' },
            { q: 'Meena had ₹250. She gave ₹90 to her brother. How much is left?', ans: 160, wrong: [340, 150, 170], hint: 'Subtract.', exp: '250 − 90 = ₹160.' },
            { q: 'What must be added to 375 to make 500?', ans: 125, wrong: [135, 115, 225], hint: '500 − 375', exp: '500 − 375 = 125.' },
            { q: 'The sum of 199 and 1 is...', ans: 200, wrong: [198, 291, 210], hint: 'One more than 199.', exp: '199 + 1 = 200.' }
        ],
        ch8_fair_share: [
            { q: 'Half of 50 is...', ans: 25, wrong: [20, 30, 100], hint: '50 ÷ 2', exp: '50 ÷ 2 = 25.' },
            { q: 'A quarter of 16 is...', ans: 4, wrong: [8, 2, 6], hint: '16 ÷ 4', exp: '16 ÷ 4 = 4.' },
            { q: 'A chapati is cut into 4 equal pieces. You eat 1. What fraction is left?', ans: 'Three quarters', wrong: ['One quarter', 'Half', 'The whole'], hint: '3 pieces out of 4 remain.', exp: '3 of the 4 equal pieces are left = three quarters.' },
            { q: '18 sweets shared equally between 2 friends. Each gets...', ans: 9, wrong: [8, 6, 10], hint: '18 ÷ 2', exp: '18 ÷ 2 = 9 sweets each.' },
            { q: 'Which picture shows a <strong>half</strong>?', ans: 'A circle cut into 2 equal parts', wrong: ['A circle cut into 2 unequal parts', 'A circle cut into 3 parts', 'A whole circle'], hint: 'The two parts must be exactly the same size.', exp: 'Halves must be equal parts.' },
            { q: '20 pencils shared equally among 5 children. Each gets...', ans: 4, wrong: [5, 3, 10], hint: '20 ÷ 5', exp: '20 ÷ 5 = 4 pencils each.' }
        ],
        ch9_hundreds2: [
            { q: 'What is 999 + 1?', ans: 1000, wrong: [9910, 1001, 990], hint: 'One more than the biggest 3-digit number.', exp: '999 + 1 = 1000.' },
            { q: 'Write 2 thousands, 3 hundreds, 0 tens and 5 ones as a number.', ans: 2305, wrong: [2350, 235, 2035], hint: 'Thousands first.', exp: '2000 + 300 + 0 + 5 = 2305.' },
            { q: 'Which is greater: 1099 or 1101?', ans: 1101, wrong: [1099, 'Both equal', 'Cannot say'], hint: 'Compare the hundreds digit.', exp: '1101 > 1099.' },
            { q: 'How many hundreds are in 1500?', ans: 15, wrong: [5, 150, 10], hint: '100 × ? = 1500', exp: '15 hundreds = 1500.' },
            { q: 'What is the place value of 3 in 3742?', ans: 3000, wrong: [300, 30, 3], hint: '3 is in the thousands place.', exp: '3 thousands = 3000.' }
        ],
        ch10_fair_fun: [
            { q: 'How many ₹5 coins make ₹50?', ans: 10, wrong: [5, 15, 25], hint: '5 × ? = 50', exp: '10 × ₹5 = ₹50.' },
            { q: 'A book costs ₹85 and a pen ₹15. Total?', ans: 100, wrong: [70, 90, 110], hint: 'Add both prices.', exp: '85 + 15 = ₹100.' },
            { q: 'You pay ₹100 for something costing ₹63. Change?', ans: 37, wrong: [47, 27, 163], hint: '100 − 63', exp: '100 − 63 = ₹37.' },
            { q: 'Which coins make exactly ₹7?', ans: 'One ₹5 and two ₹1', wrong: ['Two ₹5', 'One ₹5 and one ₹1', 'Three ₹2'], hint: '5 + 1 + 1 = 7', exp: '₹5 + ₹1 + ₹1 = ₹7.' },
            { q: 'Ravi has three ₹20 notes. How much money?', ans: 60, wrong: [23, 40, 200], hint: '3 × 20', exp: '3 × ₹20 = ₹60.' },
            { q: 'A ticket costs ₹25. How much for 4 tickets?', ans: 100, wrong: [29, 75, 125], hint: '25 + 25 + 25 + 25', exp: '4 × ₹25 = ₹100.' },
            { q: 'A toy costs ₹68. You pay ₹100. How much change do you get?', ans: 32, wrong: [28, 38, 168], hint: 'Subtract the price from the money paid.', exp: '₹100 − ₹68 = ₹32 change.' },
            { q: 'Maya has ₹50. She buys a pencil for ₹12 and an eraser for ₹8. How much is left?', ans: 30, wrong: [20, 38, 42], hint: 'Add the two prices, then subtract from ₹50.', exp: '₹12 + ₹8 = ₹20; ₹50 − ₹20 = ₹30.' }
        ],
        ch11_measure: [
            { q: 'Which is heavier: 2 kg or 1500 g?', ans: '2 kg', wrong: ['1500 g', 'Both equal', 'Cannot say'], hint: '2 kg = 2000 g.', exp: '2000 g > 1500 g.' },
            { q: 'How many 500 ml glasses fill a 2 litre bottle?', ans: 4, wrong: [2, 3, 5], hint: '2000 ml ÷ 500 ml', exp: '2000 ÷ 500 = 4 glasses.' },
            { q: '250 g + 750 g = ?', ans: '1 kg', wrong: ['500 g', '900 g', '2 kg'], hint: '250 + 750 = 1000 g.', exp: '1000 g = 1 kg.' },
            { q: 'Which would you measure in <strong>millilitres</strong>?', ans: 'Medicine in a spoon', wrong: ['Water in a tank', 'Rice in a sack', 'A person\'s height'], hint: 'Millilitres are for tiny amounts of liquid.', exp: 'Spoonfuls of medicine are measured in ml.' },
            { q: 'A watermelon weighs about...', ans: '3 kilograms', wrong: ['3 grams', '3 litres', '3 millilitres'], hint: 'It is quite heavy.', exp: 'A watermelon weighs a few kilograms.' },
            { q: 'Half a litre is the same as...', ans: '500 ml', wrong: ['50 ml', '5 ml', '5000 ml'], hint: '1000 ÷ 2', exp: '½ litre = 500 ml.' },
            { q: 'A 1 kg bag of rice is divided equally into 4 packets. How much rice is in each packet?', ans: '250 g', wrong: ['100 g', '400 g', '500 g'], hint: '1 kg = 1000 g; divide by 4.', exp: '1000 g ÷ 4 = 250 g in each packet.' },
            { q: 'A jug has 750 ml of juice. How much more is needed to make 1 litre?', ans: '250 ml', wrong: ['150 ml', '350 ml', '1 ml'], hint: '1 litre = 1000 ml.', exp: '1000 ml − 750 ml = 250 ml.' }
        ],
        ch12_times: [
            { q: 'What is 7 × 8?', ans: 56, wrong: [54, 63, 48], hint: 'The 7 times table.', exp: '7 × 8 = 56.' },
            { q: 'What is 9 × 6?', ans: 54, wrong: [45, 56, 63], hint: 'The 9 times table.', exp: '9 × 6 = 54.' },
            { q: 'What is 4 × 25?', ans: 100, wrong: [75, 125, 29], hint: 'Four lots of 25.', exp: '4 × 25 = 100.' },
            { q: 'A hen lays 3 eggs a day. How many in one week?', ans: 21, wrong: [10, 18, 24], hint: '3 × 7', exp: '3 × 7 = 21 eggs.' },
            { q: 'There are 5 rows of 8 chairs. How many chairs?', ans: 40, wrong: [13, 35, 45], hint: '5 × 8', exp: '5 × 8 = 40 chairs.' },
            { q: 'What is 12 × 0?', ans: 0, wrong: [12, 1, 120], hint: 'Anything times zero.', exp: '12 × 0 = 0.' },
            { q: 'Double 35 is...', ans: 70, wrong: [65, 75, 350], hint: '35 + 35', exp: '2 × 35 = 70.' },
            { q: 'A gardener plants 6 rows with 7 flowers in each row. How many flowers?', ans: 42, wrong: [13, 36, 49], hint: 'Rows × flowers in each row.', exp: '6 × 7 = 42 flowers.' },
            { q: 'Which multiplication sentence matches 5 + 5 + 5 + 5?', ans: '4 × 5 = 20', wrong: ['5 × 5 = 25', '4 × 4 = 16', '5 + 4 = 9'], hint: 'Count the number of groups of 5.', exp: 'There are 4 groups of 5, so 4 × 5 = 20.' }
        ],
        ch13_sharing: [
            { q: 'What is 48 ÷ 6?', ans: 8, wrong: [6, 7, 9], hint: '6 × ? = 48', exp: '6 × 8 = 48.' },
            { q: 'What is 100 ÷ 10?', ans: 10, wrong: [1, 100, 20], hint: '10 × ? = 100', exp: '10 × 10 = 100.' },
            { q: '25 sweets shared among 4 children. How many left over?', ans: 1, wrong: [0, 2, 3], hint: '4 × 6 = 24.', exp: 'Each gets 6, and 1 sweet is left over.' },
            { q: '30 books on 5 equal shelves. How many per shelf?', ans: 6, wrong: [5, 7, 25], hint: '30 ÷ 5', exp: '30 ÷ 5 = 6 books.' },
            { q: 'If 7 × 4 = 28, then 28 ÷ 7 = ?', ans: 4, wrong: [7, 28, 21], hint: 'Division undoes multiplication.', exp: '28 ÷ 7 = 4.' },
            { q: '0 ÷ 9 = ?', ans: 0, wrong: [9, 1, 'Cannot divide'], hint: 'Nothing shared among 9.', exp: '0 divided by any number is 0.' },
            { q: '32 bananas are packed equally into 4 baskets. How many bananas in each basket?', ans: 8, wrong: [6, 7, 9], hint: '32 ÷ 4', exp: '32 ÷ 4 = 8 bananas in each basket.' },
            { q: '27 children stand in groups of 3. How many groups are made?', ans: 9, wrong: [6, 8, 10], hint: '3 × ? = 27', exp: '27 ÷ 3 = 9 groups.' }
        ],
        ch14_give_take: [
            { q: 'A school has 245 girls and 268 boys. How many children in all?', ans: 513, wrong: [503, 523, 23], hint: 'Add both.', exp: '245 + 268 = 513.' },
            { q: 'A fruit seller had 300 mangoes and sold 185. How many left?', ans: 115, wrong: [125, 215, 485], hint: 'Subtract.', exp: '300 − 185 = 115.' },
            { q: 'Rina saved ₹150 in January and ₹175 in February. How much altogether?', ans: 325, wrong: [225, 315, 25], hint: 'Add both months.', exp: '150 + 175 = ₹325.' },
            { q: 'A tank had 500 litres. 125 litres were used. How much is left?', ans: 375, wrong: [385, 625, 275], hint: 'Subtract.', exp: '500 − 125 = 375 litres.' },
            { q: 'Estimate: 302 − 98 is closest to...', ans: 200, wrong: [100, 300, 400], hint: 'Round to 300 − 100.', exp: '300 − 100 = 200.' },
            { q: 'A bag has 6 packets of 8 biscuits. How many biscuits?', ans: 48, wrong: [14, 42, 54], hint: '6 × 8', exp: '6 × 8 = 48 biscuits.' },
            { q: 'A library had 625 books. It gave away 148 books. How many books remain?', ans: 477, wrong: [467, 773, 523], hint: 'Subtract the books given away.', exp: '625 − 148 = 477 books remain.' },
            { q: 'There are 135 red beads and 189 blue beads. How many beads altogether?', ans: 324, wrong: [314, 334, 54], hint: 'Add the two colours.', exp: '135 + 189 = 324 beads.' }
        ]
    };

    const EXAM_PAPER = {
        ch4_shapes: [
            { q: 'Look at the picture. Which shape has <strong>4 equal sides</strong>?', visual: '<svg class="w-56 h-24 mx-auto" viewBox="0 0 280 120" role="img" aria-label="A triangle, a square and a circle"><polygon points="42,95 72,30 102,95" fill="#bfdbfe" stroke="#2563eb" stroke-width="4"/><rect x="125" y="35" width="60" height="60" fill="#fde68a" stroke="#b45309" stroke-width="4"/><circle cx="235" cy="65" r="30" fill="#bbf7d0" stroke="#15803d" stroke-width="4"/></svg>', ans: 'Square', wrong: ['Triangle', 'Circle', 'Oval'], hint: 'Count the sides and check if all four are the same length.', exp: 'A square has 4 equal sides.' }
        ],
        ch4_lines: [
            { q: 'Which object in the picture has a <strong>curved boundary</strong>?', visual: '<svg class="w-56 h-24 mx-auto" viewBox="0 0 280 120" role="img" aria-label="A ruler, a bangle and a book"><rect x="15" y="45" width="85" height="25" fill="#fde68a" stroke="#b45309" stroke-width="4"/><circle cx="145" cy="58" r="28" fill="none" stroke="#db2777" stroke-width="10"/><rect x="195" y="32" width="60" height="52" rx="2" fill="#bfdbfe" stroke="#2563eb" stroke-width="4"/></svg>', ans: 'Bangle', wrong: ['Ruler', 'Book', 'Table'], hint: 'A curved boundary bends smoothly.', exp: 'A bangle is round, so its boundary is curved.' }
        ],
        ch4_paths: [
            { q: 'Babli sold <strong>34 books on Monday</strong> and <strong>45 books on Tuesday</strong>. How many books did she sell in the two days, and how many more did she sell on Tuesday?', visual: '<div class="mx-auto max-w-md text-center" role="img" aria-label="Picture groups showing 34 books on Monday and 45 books on Tuesday"><div class="grid grid-cols-2 gap-3 text-sm font-bold"><div class="rounded border-2 border-blue-300 bg-blue-50 p-2"><div>Monday</div><div class="text-xl">📚📚📚 📖📖📖📖</div><div>34 books</div></div><div class="rounded border-2 border-orange-300 bg-orange-50 p-2"><div>Tuesday</div><div class="text-xl">📚📚📚📚 📖📖📖📖📖</div><div>45 books</div></div></div><div class="mt-2 text-sm">34 + 45 = ? &nbsp;&nbsp; 45 − 34 = ?</div></div>', ans: '79 books in all; 11 more on Tuesday', wrong: ['69 books in all; 9 more on Tuesday', '79 books in all; 9 more on Tuesday', '89 books in all; 11 more on Tuesday'], hint: 'First add 34 and 45 for the total. Then subtract 34 from 45 for the difference.', exp: '34 + 45 = <strong>79 books</strong> in all. 45 − 34 = <strong>11 more books</strong> on Tuesday.' },
            { q: 'Use the number line in the picture. A frog at 24 jumps back 10. Where does it land?', visual: '<svg class="w-72 h-20 mx-auto" viewBox="0 0 360 90" role="img" aria-label="Number line showing a backward jump from 24 to 14"><line x1="25" y1="48" x2="335" y2="48" stroke="#334155" stroke-width="3"/><path d="M98 30 Q155 0 200 30" fill="none" stroke="#7c3aed" stroke-width="4" marker-end="url(#back-arrow)"/><defs><marker id="back-arrow" markerWidth="8" markerHeight="8" refX="1" refY="4" orient="auto"><path d="M8,0 L0,4 L8,8 z" fill="#7c3aed"/></marker></defs><text x="85" y="75" font-size="18">14</text><text x="188" y="75" font-size="18">24</text><text x="130" y="20" font-size="16">back 10</text></svg>', ans: 14, wrong: [34, 10, 4], hint: 'A backward jump means subtract 10.', exp: '24 − 10 = 14.' }
        ],
        ch4_spans: [
            { q: 'The picture shows a pencil and a classroom. Which unit is better for measuring the classroom?', visual: '<div class="text-center text-3xl" role="img" aria-label="A pencil and a classroom"><span class="mr-8">✏️</span><span>🏫</span><div class="mt-1 text-sm font-bold">pencil &nbsp;&nbsp;&nbsp;&nbsp; classroom</div></div>', ans: 'Paces', wrong: ['Fingerwidths', 'A spoonful', 'Grams'], hint: 'Use a larger length unit for a large object.', exp: 'Paces are suitable for measuring the length of a classroom.' }
        ],
        ch6_placeval: [
            { q: 'In the picture, what is the place value of the highlighted digit in <strong>582</strong>?', visual: '<div class="text-center text-4xl font-black tracking-widest" role="img" aria-label="Number 582 with digit 8 highlighted">5 <span class="rounded bg-yellow-200 px-2 text-orange-700">8</span> 2</div>', ans: 80, wrong: [8, 800, 82], hint: 'The highlighted digit is in the tens place.', exp: '8 tens = 80.' }
        ],
        ch6_expanded: [
            { q: 'Which expanded form matches the number shown in the picture: <strong>624</strong>?', visual: '<div class="text-center text-3xl" role="img" aria-label="Six hundreds, two tens and four ones">🟦🟦🟦🟦🟦🟦 &nbsp; 🟨🟨 &nbsp; 🔴🔴🔴🔴</div>', ans: '600 + 20 + 4', wrong: ['600 + 2 + 4', '60 + 20 + 4', '600 + 24 + 0'], hint: 'Count hundreds, tens and ones separately.', exp: '624 = 600 + 20 + 4.' }
        ],
        ch6_words: [
            { q: 'The picture shows <strong>407</strong>. How do we write it in words?', visual: '<div class="text-center text-4xl font-black" role="img" aria-label="Number 407">4 0 7</div>', ans: 'Four Hundred and Seven', wrong: ['Four Hundred and Seventy', 'Forty Seven', 'Four Thousand and Seven'], hint: 'There are no tens in 407.', exp: '407 is Four Hundred and Seven.' }
        ],
        ch6_compare: [
            { q: 'Which number is greater in the picture: <strong>463</strong> or <strong>436</strong>?', visual: '<div class="text-center text-3xl font-black" role="img" aria-label="Comparing 463 and 436">463 &nbsp; ? &nbsp; 436</div>', ans: 463, wrong: [436, 427, 'They are equal'], hint: 'Hundreds are equal; compare the tens digits.', exp: 'Both have 4 hundreds, but 6 tens is greater than 3 tens, so 463 is greater.' }
        ],
        ch6_patterns: [
            { q: 'Complete the number-line pattern shown: <strong>20, 30, 40, ___</strong>.', visual: '<div class="text-center text-2xl tracking-widest" role="img" aria-label="Number pattern 20, 30, 40 and blank">20 → 30 → 40 → ?</div>', ans: 50, wrong: [45, 60, 30], hint: 'The jumps are 10 each time.', exp: '40 + 10 = 50.' }
        ],
        ch6_building: [
            { q: 'Arrange the digits shown to make the <strong>smallest</strong> 3-digit number.', visual: '<div class="text-center text-4xl font-black tracking-widest" role="img" aria-label="Digits 6, 0 and 4">6 &nbsp; 0 &nbsp; 4</div>', ans: 406, wrong: [460, 604, 640], hint: '0 cannot come first; put the smallest non-zero digit first.', exp: '4, 0, 6 makes the smallest number: 406.' }
        ]
    };

    const PAPER_BADGES = {
        ch1_names: "Ch-1: What's in a Name?",
        ch2_toys: 'Ch-2: Toy Joy',
        ch3_century: 'Ch-3: Double Century',
        ch4_shapes: 'Ch-4: Shapes, Corners & Edges',
        ch4_lines: 'Ch-4: Straight vs Curved',
        ch4_paths: 'Ch-4: Grid Paths & Directions',
        ch4_spans: 'Ch-4: Measurement',
        ch5_shapes_fun: 'Ch-5: Fun with Shapes',
        ch6_placeval: 'Ch-6: Place & Face Value',
        ch6_expanded: 'Ch-6: Expanded Form',
        ch6_words: 'Ch-6: Number Names',
        ch6_compare: 'Ch-6: Comparing Numbers',
        ch6_patterns: 'Ch-6: Patterns',
        ch6_building: 'Ch-6: Building Numbers',
        ch7_raksha: 'Ch-7: Add & Subtract',
        ch8_fair_share: 'Ch-8: Fair Share',
        ch9_hundreds2: 'Ch-9: House of Hundreds - II',
        ch10_fair_fun: 'Ch-10: Fun at the Fair',
        ch11_measure: 'Ch-11: Filling & Lifting',
        ch12_times: 'Ch-12: How Many Times?',
        ch13_sharing: 'Ch-13: Sharing Equally',
        ch14_give_take: 'Ch-14: Give and Take'
    };

    /* ===============================================================
     * Revision-sheet question formats
     * Mirrors the styles used in the school's REVISION 1-4 worksheets:
     * number sentences, missing addends, fact families, true/false
     * comparisons, assertion-reason, ten-frames and number lines.
     * =============================================================== */

    const REVISION = {
        ch1_names: [
            { q: 'Which <strong>number name</strong> has the <strong>fewest letters</strong>?', ans: 'two', wrong: ['twenty two', 'nine', 'seven'], hint: 'Count the letters in each word.', exp: 'two = 3 letters, nine = 4, seven = 5, twenty two = 9.' },
            { q: 'Which <strong>number name</strong> has the <strong>most letters</strong>?', ans: 'twenty two', wrong: ['two', 'nine', 'six'], hint: 'Count the letters, spaces do not count.', exp: '"twenty two" has 9 letters — more than the others.' },
            { q: 'How many letters are there in the number name <strong>"eleven"</strong>?', ans: 6, wrong: [5, 7, 8], hint: 'e-l-e-v-e-n', exp: '"eleven" has 6 letters.' }
        ],
        ch3_century: [
            { q: 'Which pair makes <strong>200</strong>?', ans: '150 + 50', wrong: ['150 + 40', '120 + 60', '110 + 80'], hint: 'Add each pair and check.', exp: '150 + 50 = 200.' },
            { q: 'Which pair does <strong>NOT</strong> make 200?', ans: '130 + 60', wrong: ['100 + 100', '180 + 20', '160 + 40'], hint: 'Add each pair carefully.', exp: '130 + 60 = 190, not 200.' },
            { q: 'You have 4 bundles of <strong>25 sticks</strong> each. How many sticks in all?', ans: 100, wrong: [29, 75, 125], hint: '25 + 25 + 25 + 25', exp: '4 × 25 = 100 sticks.' },
            { q: 'You have 100 sticks. How many <strong>more</strong> do you need to make 200?', ans: 100, wrong: [50, 150, 200], hint: '200 − 100', exp: 'You need 100 more sticks.' }
        ],
        ch6_placeval: [
            { q: 'Write the place values of <strong>478</strong>. Which row is correct?', ans: '400 + 70 + 8', wrong: ['40 + 70 + 8', '400 + 7 + 8', '4 + 7 + 8'], hint: 'Hundreds, then tens, then ones.', exp: '478 → 4 hundreds (400), 7 tens (70), 8 ones (8).' },
            { q: 'Write the place values of <strong>124</strong>. Which row is correct?', ans: '100 + 20 + 4', wrong: ['100 + 2 + 4', '10 + 20 + 4', '1 + 2 + 4'], hint: 'Hundreds, tens, ones.', exp: '124 → 100 + 20 + 4.' },
            { q: '<strong>Statement (S):</strong> 403 has no tens.<br><strong>Reason (R):</strong> The digit in the tens place is 0.', ans: 'Both S and R are true, and R correctly explains S', wrong: ['Both S and R are true, but R does not explain S', 'S is true, but R is false', 'S is false, but R is true'], hint: 'Check the middle digit of 403, then see if that explains the statement.', exp: 'In 403 the tens digit is 0, so it has no tens — R is the correct explanation of S.' },
            { q: '<strong>Statement (S):</strong> In 560 the ones place is empty.<br><strong>Reason (R):</strong> The last digit of 560 is 0.', ans: 'Both S and R are true, and R correctly explains S', wrong: ['Both S and R are true, but R does not explain S', 'S is true, but R is false', 'S is false, but R is true'], hint: 'Look at the last digit.', exp: '560 ends in 0, so there are no ones — R explains S.' }
        ],
        ch6_expanded: [
            { q: 'Which is the correct <strong>number sentence</strong> for <strong>254</strong>?', ans: '200 + 54', wrong: ['200 − 54', '250 + 40', '205 + 44'], hint: 'Split it into hundreds and the rest.', exp: '200 + 54 = 254.' },
            { q: 'Which is the correct <strong>number sentence</strong> for <strong>376</strong>?', ans: '300 + 76', wrong: ['300 − 76', '370 + 60', '307 + 66'], hint: 'Hundreds first, then what is left.', exp: '300 + 76 = 376.' },
            { q: 'Add using expanded form: <strong>35 + 12</strong><br><em>(30 + 5) + (10 + 2)</em>', ans: 47, wrong: [37, 57, 45], hint: 'Add the tens (30 + 10), add the ones (5 + 2), then join them.', exp: '40 + 7 = 47.' },
            { q: 'Add using expanded form: <strong>44 + 36</strong><br><em>(40 + 4) + (30 + 6)</em>', ans: 80, wrong: [70, 90, 78], hint: 'Tens: 40 + 30 = 70. Ones: 4 + 6 = 10.', exp: '70 + 10 = 80.' },
            { q: 'Add using expanded form: <strong>23 + 41</strong>', ans: 64, wrong: [54, 74, 63], hint: 'Tens: 20 + 40. Ones: 3 + 1.', exp: '60 + 4 = 64.' }
        ],
        ch6_compare: [
            { q: 'True or False: <strong>21 is smaller than 91</strong>', ans: 'True', wrong: ['False', 'Cannot say', 'They are equal'], hint: 'Compare the tens digit: 2 vs 9.', exp: '21 < 91, so the statement is True.' },
            { q: 'True or False: <strong>312 is greater than 231</strong>', ans: 'True', wrong: ['False', 'Cannot say', 'They are equal'], hint: 'Compare the hundreds digit: 3 vs 2.', exp: '312 > 231, so the statement is True.' },
            { q: 'True or False: <strong>149 is greater than 433</strong>', ans: 'False', wrong: ['True', 'Cannot say', 'They are equal'], hint: 'Compare the hundreds digit: 1 vs 4.', exp: '149 < 433, so the statement is False.' },
            { q: 'True or False: <strong>500 is smaller than 405</strong>', ans: 'False', wrong: ['True', 'Cannot say', 'They are equal'], hint: 'Compare the hundreds digit: 5 vs 4.', exp: '500 > 405, so the statement is False.' },
            { q: 'Arrange in <strong>ascending</strong> order: 257, 205, 275, 250', ans: '205, 250, 257, 275', wrong: ['275, 257, 250, 205', '205, 257, 250, 275', '250, 205, 275, 257'], hint: 'Smallest first. Hundreds are equal, so compare tens.', exp: '205 < 250 < 257 < 275.' },
            { q: 'Arrange in <strong>descending</strong> order: 413, 314, 134, 143', ans: '413, 314, 143, 134', wrong: ['134, 143, 314, 413', '413, 314, 134, 143', '143, 134, 413, 314'], hint: 'Biggest first. Compare the hundreds digit.', exp: '413 > 314 > 143 > 134.' },
            { q: 'The successor of <strong>399</strong> is...', ans: 400, wrong: [390, 300, 310], hint: 'Successor means the next number.', exp: '399 + 1 = 400.' },
            { q: 'The predecessor of <strong>500</strong> is...', ans: 499, wrong: [501, 490, 400], hint: 'Predecessor means the number before.', exp: '500 − 1 = 499.' },
            { q: 'What is <strong>45 more than 50</strong>? Is it more or less than 100?', ans: '95 — less than 100', wrong: ['95 — more than 100', '5 — less than 100', '105 — more than 100'], hint: '"More than" means add, then compare with 100.', exp: '50 + 45 = 95, which is less than 100.' },
            { q: 'What is <strong>60 more than 72</strong>? Is it more or less than 100?', ans: '132 — more than 100', wrong: ['132 — less than 100', '12 — less than 100', '122 — more than 100'], hint: 'Add first, then compare with 100.', exp: '72 + 60 = 132, which is more than 100.' },
            { q: 'What is <strong>36 less than 122</strong>? Is it more or less than 100?', ans: '86 — less than 100', wrong: ['86 — more than 100', '158 — more than 100', '96 — less than 100'], hint: '"Less than" means subtract, then compare with 100.', exp: '122 − 36 = 86, which is less than 100.' }
        ],
        ch6_building: [
            { q: 'What is the <strong>smallest 2-digit</strong> number?', ans: 10, wrong: [1, 11, 99], hint: 'It is the first number with two digits.', exp: '10 is the smallest 2-digit number.' },
            { q: 'What is the <strong>largest 2-digit</strong> number?', ans: 99, wrong: [90, 100, 98], hint: 'Both digits as big as possible.', exp: '99 is the largest 2-digit number.' },
            { q: 'The sum of the <strong>smallest 2-digit number</strong> and 50 is...', ans: 60, wrong: [70, 40, 80], hint: 'The smallest 2-digit number is 10.', exp: '10 + 50 = 60.' },
            { q: 'The sum of the <strong>smallest 3-digit number</strong> and the <strong>largest 2-digit number</strong> is...', ans: 199, wrong: [189, 200, 109], hint: '100 + 99', exp: '100 + 99 = 199.' },
            { q: 'The difference between the <strong>largest</strong> and the <strong>smallest 2-digit</strong> number is...', ans: 89, wrong: [99, 79, 90], hint: '99 − 10', exp: '99 − 10 = 89.' }
        ],
        ch6_patterns: [
            { q: 'You jump in steps of <strong>5</strong> starting from 0. Where do you land after <strong>3 jumps</strong>?', ans: 15, wrong: [20, 35, 5], hint: '5, 10, 15…', exp: '3 × 5 = 15.' },
            { q: 'You jump in steps of <strong>10</strong> starting from 0. Where do you land after <strong>4 jumps</strong>?', ans: 40, wrong: [30, 50, 14], hint: '10, 20, 30…', exp: '4 × 10 = 40.' },
            { q: 'On a number line, what number is <strong>2 steps back from the double of 8</strong>?', ans: 14, wrong: [16, 18, 10], hint: 'Double 8 first, then count back 2.', exp: 'Double of 8 = 16; 16 − 2 = 14.' },
            { q: 'On a number line from 1 to 30, which number is exactly in the <strong>middle</strong>?', ans: 15, wrong: [10, 20, 30], hint: 'Half of 30.', exp: 'The middle of 1–30 is 15.' },
            { q: 'On a number line, what number is <strong>3 steps forward from 27</strong>?', ans: 30, wrong: [24, 33, 29], hint: 'Count on: 28, 29, 30.', exp: '27 + 3 = 30.' }
        ],
        ch7_raksha: [
            { q: 'Fill in the blank: <strong>___ + 45 = 100</strong>', ans: 55, wrong: [65, 35, 45], hint: '100 − 45', exp: '55 + 45 = 100.' },
            { q: 'Fill in the blank: <strong>___ + 30 = 90</strong>', ans: 60, wrong: [50, 70, 120], hint: '90 − 30', exp: '60 + 30 = 90.' },
            { q: 'Fill in the blank: <strong>120 − ___ = 75</strong>', ans: 45, wrong: [55, 35, 195], hint: '120 − 75', exp: '120 − 45 = 75.' },
            { q: '<strong>Increasing 130 by 25</strong> gives...', ans: 155, wrong: [115, 145, 105], hint: '"Increasing by" means add.', exp: '130 + 25 = 155.' },
            { q: '<strong>Decreasing 240 by 40</strong> gives...', ans: 200, wrong: [280, 210, 220], hint: '"Decreasing by" means subtract.', exp: '240 − 40 = 200.' },
            { q: 'What is <strong>45 more than 50</strong>?', ans: 95, wrong: [5, 85, 105], hint: '"More than" means add.', exp: '50 + 45 = 95.' },
            { q: 'If <strong>60 + 40</strong> is subtracted from a number, the answer is <strong>350</strong>. What is the number?', ans: 450, wrong: [360, 400, 460], hint: '60 + 40 = 100. Now add it back to 350.', exp: '350 + 100 = 450.' },
            { q: 'Using 52, 45 and 97, which is a correct <strong>addition fact</strong>?', ans: '52 + 45 = 97', wrong: ['52 + 97 = 45', '97 + 45 = 52', '45 + 97 = 52'], hint: 'The two smaller numbers add to the biggest.', exp: '52 + 45 = 97.' },
            { q: 'Using 52, 45 and 97, which is a correct <strong>subtraction fact</strong>?', ans: '97 − 45 = 52', wrong: ['52 − 45 = 97', '45 − 52 = 97', '52 − 97 = 45'], hint: 'Start from the biggest number.', exp: '97 − 45 = 52 (and 97 − 52 = 45 is also correct).' },
            { q: 'There are <strong>60 students</strong> in a class. <strong>48 are boys</strong>. How many girls?', ans: 12, wrong: [108, 22, 18], hint: 'Total − boys = girls.', exp: '60 − 48 = 12 girls.' },
            { q: 'At a station, <strong>252 people</strong> wait for Train A and <strong>189</strong> for Train B. How many in all?', ans: 441, wrong: [431, 63, 451], hint: 'Add both groups.', exp: '252 + 189 = 441 people.' },
            { q: 'At a station, <strong>252 people</strong> wait for Train A and <strong>189</strong> for Train B. How many <strong>more</strong> wait for Train A?', ans: 63, wrong: [73, 441, 53], hint: 'Find the difference.', exp: '252 − 189 = 63 more people.' },
            { q: 'Siya had <strong>20 chocolates</strong> and her mother brought <strong>12 more</strong>. How many now?', ans: 32, wrong: [8, 22, 42], hint: 'Add them.', exp: '20 + 12 = 32 chocolates.' },
            { q: 'Maya had <strong>35 crackers</strong> and used <strong>16</strong>. How many are left?', ans: 19, wrong: [51, 21, 29], hint: 'Subtract what was used.', exp: '35 − 16 = 19 crackers.' },
            { q: 'Find the missing digit: <strong>3 5 + 1 ? = 5 0</strong>', ans: 5, wrong: [4, 6, 0], hint: '35 + 15 = 50.', exp: 'The missing digit is 5, because 35 + 15 = 50.' },
            { q: 'Find the missing number: <strong>2 5 + ? = 8 2</strong>', ans: 57, wrong: [67, 47, 107], hint: '82 − 25', exp: '82 − 25 = 57.' },
            { q: 'Add <strong>16 and 6</strong> using ten-frames. What is the answer?', ans: 22, wrong: [12, 20, 26], hint: 'Fill 16 up to 20 using 4, then add the 2 that are left.', exp: '16 + 4 = 20, then 20 + 2 = 22.' },
            { q: 'A ten-frame is full when it holds how many counters?', ans: 10, wrong: [5, 12, 20], hint: 'The name gives it away.', exp: 'A ten-frame holds 10 counters.' }
        ],
        ch8_fair_share: [
            { q: 'What is the <strong>double</strong> of 14?', ans: 28, wrong: [7, 24, 16], hint: 'Double means add it to itself.', exp: '14 + 14 = 28.' },
            { q: 'What is <strong>half</strong> of 14?', ans: 7, wrong: [28, 6, 8], hint: 'Split it into two equal parts.', exp: '14 ÷ 2 = 7.' },
            { q: 'What is the <strong>double</strong> of 80?', ans: 160, wrong: [40, 100, 180], hint: '80 + 80', exp: '80 + 80 = 160.' },
            { q: 'What is <strong>half</strong> of 80?', ans: 40, wrong: [160, 20, 45], hint: '80 ÷ 2', exp: '80 ÷ 2 = 40.' },
            { q: 'What is <strong>half</strong> of 120?', ans: 60, wrong: [240, 50, 70], hint: '120 ÷ 2', exp: '120 ÷ 2 = 60.' },
            { q: 'What is the <strong>double</strong> of 120?', ans: 240, wrong: [60, 220, 140], hint: '120 + 120', exp: '120 + 120 = 240.' },
            { q: 'When a whole object is divided into <strong>two equal parts</strong>, one part is called a...', ans: 'half', wrong: ['quarter', 'whole', 'double'], hint: 'Two equal parts.', exp: 'One of two equal parts is a half.' },
            { q: 'When a whole object is divided into <strong>four equal parts</strong>, one part is called a...', ans: 'quarter', wrong: ['half', 'whole', 'double'], hint: 'Four equal parts.', exp: 'One of four equal parts is a quarter.' }
        ]
    };

    /* --- Procedural versions so these formats never run dry --- */

    const rev_true_false = () => {
        const a = randInt(100, 999);
        let b = randInt(100, 999);
        while (a === b) b = randInt(100, 999);
        const smaller = Math.random() > 0.5;
        const claim = smaller ? `${a} is smaller than ${b}` : `${a} is greater than ${b}`;
        const truth = smaller ? a < b : a > b;
        return buildQuestion({
            topic: 'ch6_compare',
            badge: 'Ch-6: True or False',
            q: 'True or False: <strong>' + claim + '</strong>',
            ans: truth ? 'True' : 'False',
            wrong: ['True', 'False', 'Cannot say'],
            hint: 'Compare the hundreds digit first, then the tens.',
            exp: `${a} is ${a > b ? 'greater than' : 'less than'} ${b}, so the statement is <strong>${truth ? 'True' : 'False'}</strong>.`
        });
    };

    const rev_missing_addend = () => {
        const total = pick([50, 60, 70, 80, 90, 100, 150, 200]);
        const known = randInt(10, total - 10);
        const missing = total - known;
        return buildQuestion({
            topic: 'ch7_raksha',
            badge: 'Ch-7: Missing Number',
            q: 'Fill in the blank: <strong>___ + ' + known + ' = ' + total + '</strong>',
            ans: missing,
            wrong: [missing + 10, Math.max(0, missing - 10), total + known],
            hint: 'Take away ' + known + ' from ' + total + '.',
            exp: total + ' − ' + known + ' = <strong>' + missing + '</strong>.'
        });
    };

    const rev_more_less = () => {
        const base = randInt(30, 140);
        const step = randInt(15, 70);
        const isMore = Math.random() > 0.5;
        const result = isMore ? base + step : base - step;
        const side = result > 100 ? 'more than 100' : 'less than 100';
        const otherSide = result > 100 ? 'less than 100' : 'more than 100';
        return buildQuestion({
            topic: 'ch6_compare',
            badge: 'Ch-6: More or Less than 100',
            q: 'What is <strong>' + step + ' ' + (isMore ? 'more' : 'less') + ' than ' + base + '</strong>? Is it more or less than 100?',
            ans: result + ' — ' + side,
            wrong: [result + ' — ' + otherSide, (isMore ? base - step : base + step) + ' — ' + side, (result + 10) + ' — ' + side],
            hint: '"' + (isMore ? 'More' : 'Less') + ' than" means ' + (isMore ? 'add' : 'subtract') + '. Then compare with 100.',
            exp: base + (isMore ? ' + ' : ' − ') + step + ' = ' + result + ', which is ' + side + '.'
        });
    };

    const rev_half_double = () => {
        const n = pick([10, 12, 14, 16, 18, 20, 24, 30, 40, 50, 60, 80, 100, 120]);
        const wantDouble = Math.random() > 0.5;
        const ans = wantDouble ? n * 2 : n / 2;
        return buildQuestion({
            topic: 'ch8_fair_share',
            badge: 'Ch-8: Half & Double',
            q: 'What is the <strong>' + (wantDouble ? 'double' : 'half') + '</strong> of <strong>' + n + '</strong>?',
            ans: ans,
            wrong: [wantDouble ? n / 2 : n * 2, ans + 2, Math.max(1, ans - 2)],
            hint: wantDouble ? 'Add the number to itself.' : 'Split the number into two equal parts.',
            exp: wantDouble ? `${n} + ${n} = ${ans}.` : `${n} ÷ 2 = ${ans}.`
        });
    };

    const REVISION_BADGES = {
        ch1_names: "Ch-1: What's in a Name?",
        ch3_century: 'Ch-3: Double Century',
        ch6_placeval: 'Ch-6: Place & Face Value',
        ch6_expanded: 'Ch-6: Number Sentences',
        ch6_compare: 'Ch-6: Comparing Numbers',
        ch6_building: 'Ch-6: Building Numbers',
        ch6_patterns: 'Ch-6: Number Line & Jumps',
        ch7_raksha: 'Ch-7: Add & Subtract',
        ch8_fair_share: 'Ch-8: Half & Double'
    };

    // Fold the extra paper questions into the chapters above.
    Object.keys(PAPER).forEach((key) => {
        const extra = bankGenerator(key, PAPER_BADGES[key] || 'Math Mela', PAPER[key]);
        mathGenerators[key] = mathGenerators[key] ? mix(mathGenerators[key], extra) : extra;
    });

    Object.keys(EXAM_PAPER).forEach((key) => {
        const extra = bankGenerator(key, PAPER_BADGES[key] || 'Math Exam Practice', EXAM_PAPER[key]);
        mathGenerators[key] = mathGenerators[key] ? mix(mathGenerators[key], extra) : extra;
    });

    Object.keys(REVISION).forEach((key) => {
        const extra = bankGenerator(key, REVISION_BADGES[key] || 'Math Mela', REVISION[key]);
        mathGenerators[key] = mathGenerators[key] ? mix(mathGenerators[key], extra) : extra;
    });

    [rev_true_false, rev_missing_addend, rev_more_less, rev_half_double].forEach((gen) => {
        const key = gen().topic;
        mathGenerators[key] = mix(mathGenerators[key], gen);
    });

    B.registerBook({
        subject: 'math',
        book: 'NCERT Math Mela (Class 3)',
        generators: mathGenerators,
        topics: [
                { id: 'all', label: '🌟 All Math Chapters (Mixed Practice)' },
                { id: 'ch1_names', label: "Ch-1: What's in a Name? (Letters & Vowels)" },
                { id: 'ch2_toys', label: 'Ch-2: Toy Joy (Grouping in Tens & Ones)' },
                { id: 'ch3_century', label: 'Ch-3: Double Century (Half / Single / Double)' },
                { id: 'ch4_shapes', label: 'Ch-4: 2D Shapes, Corners & Edges' },
                { id: 'ch4_lines', label: 'Ch-4: Straight vs Curved Boundaries' },
                { id: 'ch4_paths', label: 'Ch-4: Grid Paths & Directions' },
                { id: 'ch4_spans', label: 'Ch-4: Footspan, Handspan & Cubit' },
                { id: 'ch5_shapes_fun', label: 'Ch-5: Fun with Shapes (Roll, Slide, Stack)' },
                { id: 'ch6_placeval', label: 'Ch-6: Place Value & Face Value' },
                { id: 'ch6_expanded', label: 'Ch-6: Expanded Form & Standard Form' },
                { id: 'ch6_words', label: 'Ch-6: Number Names' },
                { id: 'ch6_compare', label: 'Ch-6: Comparing & Ordering Numbers' },
                { id: 'ch6_patterns', label: 'Ch-6: Skip Counting & Patterns' },
                { id: 'ch6_building', label: 'Ch-6: Smallest & Largest 3-Digit Numbers' },
                { id: 'ch7_raksha', label: 'Ch-7: Raksha Bandhan (Add & Subtract)' },
                { id: 'ch8_fair_share', label: 'Ch-8: Fair Share (Halves & Quarters)' },
                { id: 'ch9_hundreds2', label: 'Ch-9: House of Hundreds - II (Up to 9999)' },
                { id: 'ch10_fair_fun', label: 'Ch-10: Fun at the Fair (Money & Change)' },
                { id: 'ch11_measure', label: 'Ch-11: Filling & Lifting (Litres & Kilograms)' },
                { id: 'ch12_times', label: 'Ch-12: How Many Times? (Multiplication)' },
                { id: 'ch13_sharing', label: 'Ch-13: Sharing Equally (Division)' },
                { id: 'ch14_give_take', label: 'Ch-14: Give and Take (Word Problems)' }
            ]
    });

})(typeof window !== 'undefined' ? window : globalThis);
