/*
 * Class 3 Learning Hub - EVS question bank
 * ------------------------------------------------------------------
 * Book   : NCERT Our Wondrous World (Class 3)
 * Subject: evs
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
     * EVS - NCERT "Our Wondrous World" Class 3
     * =============================================================== */

    const evs_ch1_family_bank = bankGenerator('evs_ch1_family', 'Ch-1: My Family and Me', [
        { q: 'Your father\'s mother is your...', ans: 'Grandmother', wrong: ['Aunt', 'Sister', 'Cousin'], hint: 'She is one generation above your father.', exp: 'Father\'s mother = grandmother (dadi).' },
        { q: 'Your mother\'s brother is your...', ans: 'Uncle (mama)', wrong: ['Cousin', 'Nephew', 'Grandfather'], hint: 'He is your mother\'s sibling.', exp: 'Mother\'s brother is your maternal uncle (mama).' },
        { q: 'Your uncle\'s children are your...', ans: 'Cousins', wrong: ['Siblings', 'Nephews', 'Grandparents'], hint: 'Same generation as you.', exp: 'Uncle\'s children are cousins.' },
        { q: 'A family with parents, children, grandparents and uncles living together is called a...', ans: 'Joint family', wrong: ['Nuclear family', 'Small family', 'Single family'], hint: 'Many relatives under one roof.', exp: 'That is a joint family.' },
        { q: 'A family with only parents and their children is called a...', ans: 'Nuclear family', wrong: ['Joint family', 'Big family', 'Extended family'], hint: 'Just the small core group.', exp: 'That is a nuclear family.' },
        { q: 'Which of these do we <strong>inherit</strong> from our parents?', ans: 'Eye colour and hair type', wrong: ['Our school bag', 'Our favourite food', 'Our clothes'], hint: 'Something we are born with.', exp: 'Physical traits like eye colour are inherited.' },
        { q: 'How can children help at home?', ans: 'By keeping their room tidy and helping with small chores', wrong: ['By watching TV all day', 'By making a mess', 'By refusing to share'], hint: 'Sharing work makes a happy home.', exp: 'Helping with chores shares the family workload.' },
        { q: 'A family tree shows...', ans: 'How the members of a family are related', wrong: ['The trees near a house', 'The family\'s income', 'The family\'s address'], hint: 'It is a diagram of relationships.', exp: 'A family tree maps out relationships.' },
        { q: 'Your parents\' parents are your...', ans: 'Grandparents', wrong: ['Cousins', 'Uncles', 'Neighbours'], hint: 'The oldest generation in the family.', exp: 'They are your grandparents.' }
    ]);

    const evs_ch2_caring_bank = bankGenerator('evs_ch2_caring', 'Ch-2: Caring & Sharing', [
        { q: 'How should we behave with <strong>elders</strong> in the family?', ans: 'Listen to them respectfully and help them', wrong: ['Ignore what they say', 'Speak loudly to them', 'Never sit with them'], hint: 'Respect and care.', exp: 'Elders should be treated with respect and care.' },
        { q: 'What should you do if you see a stray puppy without water in summer?', ans: 'Keep a bowl of clean water for it', wrong: ['Chase it away', 'Throw stones at it', 'Ignore it completely'], hint: 'Be kind to animals.', exp: 'Providing water is a simple act of kindness.' },
        { q: 'How can you help a classmate who uses a wheelchair?', ans: 'Make space and help them move around comfortably', wrong: ['Stare at them', 'Leave them alone always', 'Laugh at them'], hint: 'Be inclusive.', exp: 'Helping and including everyone is caring behaviour.' },
        { q: 'Which of these shows <strong>sharing</strong>?', ans: 'Giving half your snack to a friend who has none', wrong: ['Eating everything quickly', 'Hiding your tiffin', 'Refusing to lend a pencil'], hint: 'Sharing means giving a part to others.', exp: 'Sharing food with a friend in need is caring.' },
        { q: 'Why should we help our grandparents?', ans: 'Because they may find some tasks difficult and they cared for us', wrong: ['Because we get money', 'Because we are told to only', 'We should not help them'], hint: 'Think about love and gratitude.', exp: 'We help elders out of love, respect and gratitude.' },
        { q: 'Who takes care of us when we are sick?', ans: 'Our family and doctors', wrong: ['Only strangers', 'Nobody', 'Only the shopkeeper'], hint: 'People who love and treat us.', exp: 'Family members and doctors care for us in illness.' }
    ]);

    const FESTIVALS = [
        { name: 'Baisakhi', type: 'Harvest Festival', detail: 'celebrated in Punjab to mark the wheat harvest' },
        { name: 'Pongal', type: 'Harvest Festival', detail: 'celebrated in Tamil Nadu with sweet rice cooked in new pots' },
        { name: 'Onam', type: 'Harvest Festival', detail: 'celebrated in Kerala with pookkalam flower carpets and a grand sadya' },
        { name: 'Bihu', type: 'Harvest Festival', detail: 'celebrated in Assam with folk dance and songs' },
        { name: 'Diwali', type: 'Religious Festival', detail: 'the festival of lights, with diyas, rangoli and sweets' },
        { name: 'Holi', type: 'Religious Festival', detail: 'the festival of colours played with gulal' },
        { name: 'Eid-ul-Fitr', type: 'Religious Festival', detail: 'celebrated after Ramzan with prayers and sheer khurma' },
        { name: 'Christmas', type: 'Religious Festival', detail: 'celebrated on 25 December with carols and a decorated tree' },
        { name: 'Independence Day', type: 'National Festival', detail: 'celebrated on 15 August with flag hoisting' },
        { name: 'Republic Day', type: 'National Festival', detail: 'celebrated on 26 January with a grand parade' },
        { name: 'Gandhi Jayanti', type: 'National Festival', detail: 'celebrated on 2 October, the birthday of Mahatma Gandhi' }
    ];

    const evs_ch3_festivals_proc = () => {
        const item = pick(FESTIVALS);
        const askType = Math.random() > 0.4;
        if (askType) {
            return buildQuestion({
                topic: 'evs_ch3_festivals',
                badge: 'Ch-3: Celebrating Festivals',
                q: 'Which kind of festival is <strong>' + item.name + '</strong>?',
                ans: item.type,
                wrong: ['Harvest Festival', 'Religious Festival', 'National Festival'],
                hint: 'Harvest festivals celebrate crops, national festivals celebrate the country.',
                exp: item.name + ' is a <strong>' + item.type + '</strong> — ' + item.detail + '.'
            });
        }
        const others = shuffle(FESTIVALS.filter((f) => f.name !== item.name)).slice(0, 3).map((f) => f.name);
        return buildQuestion({
            topic: 'evs_ch3_festivals',
            badge: 'Ch-3: Celebrating Festivals',
            q: 'Which festival is <strong>' + item.detail + '</strong>?',
            ans: item.name,
            wrong: others,
            hint: 'Match the celebration style with the festival.',
            exp: item.name + ' is ' + item.detail + '.'
        });
    };

    const evs_ch3_festivals_bank = bankGenerator('evs_ch3_festivals', 'Ch-3: Festivals', [
        { q: 'On which date do we celebrate <strong>Independence Day</strong>?', ans: '15 August', wrong: ['26 January', '2 October', '14 November'], hint: 'India became free in 1947 on this day.', exp: 'Independence Day is on 15 August.' },
        { q: 'On which date do we celebrate <strong>Republic Day</strong>?', ans: '26 January', wrong: ['15 August', '2 October', '25 December'], hint: 'Our Constitution came into force on this day.', exp: 'Republic Day is on 26 January.' },
        { q: 'Which festival is called the <strong>Festival of Lights</strong>?', ans: 'Diwali', wrong: ['Holi', 'Eid', 'Pongal'], hint: 'Diyas are lit everywhere.', exp: 'Diwali is the festival of lights.' },
        { q: 'Which festival is called the <strong>Festival of Colours</strong>?', ans: 'Holi', wrong: ['Diwali', 'Onam', 'Baisakhi'], hint: 'Gulal and water are used.', exp: 'Holi is the festival of colours.' },
        { q: 'Why should we celebrate festivals in an <strong>eco-friendly</strong> way?', ans: 'To reduce pollution and protect animals and people', wrong: ['To spend more money', 'To make more noise', 'To use more crackers'], hint: 'Think of smoke, noise and waste.', exp: 'Eco-friendly celebrations keep the air clean and animals safe.' },
        { q: 'Which festival is celebrated with <strong>pookkalam</strong> (flower carpets)?', ans: 'Onam', wrong: ['Pongal', 'Bihu', 'Lohri'], hint: 'It is a Kerala harvest festival.', exp: 'Onam is celebrated with pookkalam.' },
        { q: 'What do farmers mainly celebrate during a <strong>harvest festival</strong>?', ans: 'A good crop and thanks to nature', wrong: ['The start of school', 'A new house', 'The end of the year'], hint: 'It is linked to farming.', exp: 'Harvest festivals give thanks for a good crop.' },
        { q: 'Which sweet dish is specially made during <strong>Pongal</strong>?', ans: 'Sweet rice (pongal) cooked in a new pot', wrong: ['Gujiya', 'Sheer khurma', 'Plum cake'], hint: 'It shares the festival\'s name.', exp: 'Sweet pongal is cooked in a new pot until it boils over.' },
        { q: 'Festivals help us to...', ans: 'Come together, share joy and respect different cultures', wrong: ['Stay away from others', 'Waste food', 'Miss school only'], hint: 'Think about community.', exp: 'Festivals build togetherness and respect for diversity.' }
    ]);

    const PLANT_PARTS = [
        { part: 'Roots', fn: 'absorb water and minerals from the soil and hold the plant firmly' },
        { part: 'Stem', fn: 'carry water and food to all parts of the plant and hold up the leaves' },
        { part: 'Leaves', fn: 'make food for the plant using sunlight, water and air' },
        { part: 'Flowers', fn: 'make seeds so that new plants can grow' },
        { part: 'Fruit', fn: 'protect the seeds inside' },
        { part: 'Seeds', fn: 'grow into a brand new plant' }
    ];

    const evs_ch4_plants_proc = () => {
        const item = pick(PLANT_PARTS);
        const reverse = Math.random() > 0.5;
        if (reverse) {
            return buildQuestion({
                topic: 'evs_ch4_plants',
                badge: 'Ch-4: Getting to Know Plants',
                q: 'Which part of a plant helps to <strong>' + item.fn + '</strong>?',
                ans: item.part,
                wrong: PLANT_PARTS.filter((p) => p.part !== item.part).map((p) => p.part),
                hint: 'Roots are underground, leaves make food, stems carry water, flowers make seeds.',
                exp: 'The <strong>' + item.part.toLowerCase() + '</strong> ' + item.fn + '.'
            });
        }
        return buildQuestion({
            topic: 'evs_ch4_plants',
            badge: 'Ch-4: Getting to Know Plants',
            q: 'What is the main job of the <strong>' + item.part.toLowerCase() + '</strong> of a plant?',
            ans: 'To ' + item.fn,
            wrong: PLANT_PARTS.filter((p) => p.part !== item.part).map((p) => 'To ' + p.fn),
            hint: 'Think about where this part is and what it touches.',
            exp: 'The ' + item.part.toLowerCase() + ' ' + item.fn + '.'
        });
    };

    const evs_ch4_plants_bank = bankGenerator('evs_ch4_plants', 'Ch-4: Plants', [
        { q: 'The process by which leaves make food is called...', ans: 'Photosynthesis', wrong: ['Respiration', 'Germination', 'Pollination'], hint: 'Photo means light.', exp: 'Leaves make food by photosynthesis using sunlight.' },
        { q: 'Which gas do plants take in to make food?', ans: 'Carbon dioxide', wrong: ['Oxygen', 'Nitrogen', 'Hydrogen'], hint: 'It is the gas we breathe out.', exp: 'Plants absorb carbon dioxide for photosynthesis.' },
        { q: 'Which gas do plants release during photosynthesis?', ans: 'Oxygen', wrong: ['Carbon dioxide', 'Nitrogen', 'Smoke'], hint: 'It is the gas we breathe in.', exp: 'Plants release oxygen, which we need to breathe.' },
        { q: 'Tiny pores on leaves that help plants breathe are called...', ans: 'Stomata', wrong: ['Veins', 'Roots', 'Petals'], hint: 'They are too small to see without a lens.', exp: 'Stomata are tiny pores on the leaf surface.' },
        { q: 'The lines seen on a leaf are called...', ans: 'Veins', wrong: ['Stomata', 'Roots', 'Stalks'], hint: 'They carry water inside the leaf.', exp: 'Leaf veins carry water and food.' },
        { q: 'Which plant is a <strong>climber</strong>?', ans: 'Money plant', wrong: ['Mango tree', 'Rose shrub', 'Grass'], hint: 'It needs support to climb.', exp: 'Money plant is a climber.' },
        { q: 'Which plant has a <strong>weak stem</strong> that spreads on the ground?', ans: 'Pumpkin (a creeper)', wrong: ['Neem tree', 'Banyan tree', 'Tulsi shrub'], hint: 'Creepers creep along the soil.', exp: 'Pumpkin is a creeper with a weak stem.' },
        { q: 'Which of these is a <strong>tree</strong>?', ans: 'Banyan', wrong: ['Rose', 'Mint', 'Grass'], hint: 'It is tall with a thick woody trunk.', exp: 'A banyan is a tree.' },
        { q: 'Which part of the carrot plant do we eat?', ans: 'Root', wrong: ['Leaf', 'Flower', 'Stem'], hint: 'It grows underground.', exp: 'Carrot is an edible root.' },
        { q: 'Which part of the spinach (palak) plant do we eat?', ans: 'Leaves', wrong: ['Root', 'Seed', 'Flower'], hint: 'It is a leafy vegetable.', exp: 'We eat spinach leaves.' },
        { q: 'Which part of the cauliflower do we eat?', ans: 'Flower', wrong: ['Root', 'Stem', 'Seed'], hint: 'The white part is a bunch of flower buds.', exp: 'Cauliflower is an edible flower.' },
        { q: 'What does a seed need to <strong>germinate</strong>?', ans: 'Water, air and the right warmth', wrong: ['Only soil', 'Only sunlight', 'Only fertiliser'], hint: 'Three basic things.', exp: 'Seeds need water, air and suitable temperature to sprout.' },
        { q: 'Which plant is famous as a <strong>medicinal plant</strong> used at home?', ans: 'Tulsi', wrong: ['Rose', 'Sunflower', 'Marigold'], hint: 'It is used in kadha and tea.', exp: 'Tulsi is a well-known medicinal plant.' },
        { q: 'Why should we water plants regularly?', ans: 'Because plants need water to make food and stay alive', wrong: ['To make the soil dirty', 'To wash the leaves only', 'Because water is cheap'], hint: 'Water travels from roots to leaves.', exp: 'Water is essential for photosynthesis and plant life.' }
    ]);

    const evs_ch5_coexistence_bank = bankGenerator('evs_ch5_coexistence', 'Ch-5: Plants & Animals Together', [
        { q: 'Honeybees visit flowers for nectar. How do they help the plant in return?', ans: 'They carry pollen from flower to flower (pollination)', wrong: ['They eat the roots', 'They drink the plant\'s water', 'They stop the leaves from growing'], hint: 'Pollen sticks to their legs.', exp: 'Bees pollinate flowers so that fruits and seeds can form.' },
        { q: 'How do <strong>earthworms</strong> help plants?', ans: 'They loosen the soil so air and water reach the roots', wrong: ['They eat healthy roots', 'They block water', 'They destroy seeds'], hint: 'They are called the farmer\'s friend.', exp: 'Earthworms aerate and enrich the soil.' },
        { q: 'Birds build nests in trees. What is this relationship called?', ans: 'The tree gives shelter (habitat) to the bird', wrong: ['The bird harms the tree', 'The tree eats the bird', 'They compete for food'], hint: 'One provides a home.', exp: 'Trees provide habitat and shelter for birds.' },
        { q: 'How do animals help spread <strong>seeds</strong>?', ans: 'They eat fruits and drop the seeds in new places', wrong: ['They bury all seeds forever', 'They crush every seed', 'They do not help at all'], hint: 'Think about what happens after a bird eats a berry.', exp: 'Animals disperse seeds far from the parent plant.' },
        { q: 'A <strong>food chain</strong> always begins with...', ans: 'A green plant', wrong: ['A lion', 'A snake', 'An eagle'], hint: 'Only plants make their own food.', exp: 'Green plants are the producers that start every food chain.' },
        { q: 'In the chain <em>grass → grasshopper → frog → snake</em>, what does the frog eat?', ans: 'The grasshopper', wrong: ['The grass', 'The snake', 'Nothing'], hint: 'Follow the arrow into the frog.', exp: 'The arrow shows the grasshopper is eaten by the frog.' },
        { q: 'Animals that eat <strong>only plants</strong> are called...', ans: 'Herbivores', wrong: ['Carnivores', 'Omnivores', 'Producers'], hint: 'Cow, goat, deer.', exp: 'Plant-eaters are herbivores.' },
        { q: 'Animals that eat <strong>only other animals</strong> are called...', ans: 'Carnivores', wrong: ['Herbivores', 'Omnivores', 'Producers'], hint: 'Lion, tiger, eagle.', exp: 'Flesh-eaters are carnivores.' },
        { q: 'Animals that eat <strong>both plants and animals</strong> are called...', ans: 'Omnivores', wrong: ['Herbivores', 'Carnivores', 'Decomposers'], hint: 'Crow, bear, human.', exp: 'Mixed eaters are omnivores.' },
        { q: 'Which animal gives us <strong>wool</strong>?', ans: 'Sheep', wrong: ['Cow', 'Hen', 'Goat only'], hint: 'Its fleece is sheared.', exp: 'Wool comes from sheep.' },
        { q: 'Trees give us shade, fruit, wood and which vital gas?', ans: 'Oxygen', wrong: ['Carbon dioxide', 'Nitrogen', 'Smoke'], hint: 'We breathe it in.', exp: 'Trees release oxygen.' },
        { q: 'What happens if all the bees disappear?', ans: 'Many plants will not make fruits and seeds', wrong: ['Nothing will change', 'Plants will grow faster', 'It will rain more'], hint: 'Bees are key pollinators.', exp: 'Without pollinators, fruit and seed production drops sharply.' }
    ]);

    const evs_ch6_harmony_bank = bankGenerator('evs_ch6_harmony', 'Ch-6: Living in Harmony', [
        { q: 'Why should we keep a bowl of water on the balcony in summer?', ans: 'So that thirsty birds and small animals can drink', wrong: ['To keep the balcony wet', 'To grow plants', 'To cool the house'], hint: 'Think about birds in the heat.', exp: 'Water bowls save birds during hot summers.' },
        { q: 'Wet kitchen waste should be put in which coloured bin?', ans: 'Green bin', wrong: ['Blue bin', 'Red bin', 'Black bin'], hint: 'Green is for biodegradable waste.', exp: 'Green bin = wet/biodegradable waste.' },
        { q: 'Dry waste like plastic and paper goes into which bin?', ans: 'Blue bin', wrong: ['Green bin', 'Red bin', 'Yellow bin'], hint: 'Blue is for recyclables.', exp: 'Blue bin = dry/recyclable waste.' },
        { q: 'What are the three Rs of protecting the environment?', ans: 'Reduce, Reuse, Recycle', wrong: ['Run, Rest, Repeat', 'Read, Write, Recite', 'Reduce, Remove, Repair'], hint: 'All three start with "Re".', exp: 'Reduce, Reuse and Recycle.' },
        { q: 'Turning off the tap while brushing your teeth helps to...', ans: 'Save water', wrong: ['Save electricity', 'Save paper', 'Make noise'], hint: 'Water flows out of the tap.', exp: 'It conserves water.' },
        { q: 'Which of these causes <strong>air pollution</strong>?', ans: 'Burning garbage and plastics', wrong: ['Planting trees', 'Cycling to school', 'Using a cloth bag'], hint: 'It makes smoke.', exp: 'Burning waste releases harmful smoke into the air.' },
        { q: 'Which of these causes <strong>noise pollution</strong>?', ans: 'Loudspeakers and honking horns', wrong: ['Birds chirping softly', 'Reading a book', 'Walking quietly'], hint: 'Very loud sounds.', exp: 'Loudspeakers and horns create noise pollution.' },
        { q: 'Why should we say NO to plastic bags?', ans: 'Because they do not rot and harm animals and soil', wrong: ['Because they are colourful', 'Because they are heavy', 'Because they are expensive'], hint: 'They stay in the environment for hundreds of years.', exp: 'Plastic is non-biodegradable and harms animals and soil.' },
        { q: 'Planting more trees helps to...', ans: 'Give clean air, shade and homes for birds', wrong: ['Increase pollution', 'Reduce rainfall', 'Make the soil poor'], hint: 'Trees are our friends.', exp: 'Trees clean the air, cool the area and shelter wildlife.' },
        { q: 'Which is the best way to carry vegetables from the market?', ans: 'In a cloth or jute bag', wrong: ['In a thin plastic bag', 'In your hands only', 'In a thermocol box'], hint: 'It should be reusable.', exp: 'Cloth and jute bags can be reused many times.' },
        { q: 'What should you do with old newspapers and bottles?', ans: 'Give them for recycling', wrong: ['Burn them', 'Throw them in a river', 'Bury them in the garden'], hint: 'They can be made into new things.', exp: 'Recycling saves resources and reduces waste.' },
        { q: 'Rainwater harvesting means...', ans: 'Collecting and storing rainwater for later use', wrong: ['Letting rainwater flow away', 'Drinking rain directly always', 'Stopping the rain'], hint: 'Harvest = collect.', exp: 'Rainwater harvesting stores rain for future use.' }
    ]);

    const evs_ch7_water_bank = bankGenerator('evs_ch7_water', 'Ch-7: Water for Life', [
        { q: 'Which of these is a <strong>natural source</strong> of water?', ans: 'River', wrong: ['Tap', 'Hand pump', 'Water bottle'], hint: 'It is not made by people.', exp: 'Rivers, lakes, ponds and rain are natural sources.' },
        { q: 'The sun turns water into vapour. This process is called...', ans: 'Evaporation', wrong: ['Condensation', 'Precipitation', 'Filtration'], hint: 'Water disappears into the air.', exp: 'Heating water turns it into vapour — evaporation.' },
        { q: 'Water vapour cools and turns into tiny droplets. This is called...', ans: 'Condensation', wrong: ['Evaporation', 'Freezing', 'Boiling'], hint: 'It forms clouds.', exp: 'Cooling vapour condenses into water droplets, forming clouds.' },
        { q: 'Rain, snow and hail together are called...', ans: 'Precipitation', wrong: ['Evaporation', 'Condensation', 'Irrigation'], hint: 'Water falling from clouds.', exp: 'Precipitation is water falling from the sky.' },
        { q: 'Which method makes water safe to drink at home?', ans: 'Boiling and then filtering', wrong: ['Adding sugar', 'Keeping it in the sun', 'Shaking the bottle'], hint: 'Kill the germs first.', exp: 'Boiling kills germs; filtering removes dirt.' },
        { q: 'At what temperature does water <strong>freeze</strong> into ice?', ans: '0 °C', wrong: ['100 °C', '50 °C', '37 °C'], hint: 'The freezing point.', exp: 'Water freezes at 0 degrees Celsius.' },
        { q: 'At what temperature does water <strong>boil</strong>?', ans: '100 °C', wrong: ['0 °C', '50 °C', '37 °C'], hint: 'The boiling point.', exp: 'Water boils at 100 degrees Celsius.' },
        { q: 'Which disease can spread through <strong>dirty water</strong>?', ans: 'Diarrhoea', wrong: ['Fracture', 'Toothache', 'Sunburn'], hint: 'It affects the stomach.', exp: 'Diarrhoea, cholera and typhoid spread through unsafe water.' },
        { q: 'Which is the best way to save water while washing clothes?', ans: 'Use a bucket instead of running water', wrong: ['Keep the tap running', 'Wash one cloth at a time under the tap', 'Use the shower'], hint: 'Control how much water flows.', exp: 'A bucket uses far less water than a running tap.' },
        { q: 'Most of the Earth\'s surface is covered by...', ans: 'Water', wrong: ['Land', 'Ice only', 'Forests'], hint: 'About three quarters.', exp: 'Nearly three-fourths of the Earth is covered by water.' },
        { q: 'Why can we not drink sea water?', ans: 'Because it is too salty', wrong: ['Because it is too cold', 'Because it is too sweet', 'Because it is frozen'], hint: 'Taste the sea.', exp: 'Sea water contains too much salt for us to drink.' }
    ]);

    const evs_ch8_shelter_bank = bankGenerator('evs_ch8_shelter', 'Ch-8: Our Shelter', [
        { q: 'A house made of mud, straw and bamboo is called a...', ans: 'Kutcha house', wrong: ['Pucca house', 'Igloo', 'Houseboat'], hint: 'Made from natural, temporary materials.', exp: 'Kutcha houses use mud, straw and bamboo.' },
        { q: 'A house made of bricks, cement and steel is called a...', ans: 'Pucca house', wrong: ['Kutcha house', 'Tent', 'Hut'], hint: 'Strong and long-lasting.', exp: 'Pucca houses are strong and permanent.' },
        { q: 'An <strong>igloo</strong> is made of blocks of...', ans: 'Ice and snow', wrong: ['Mud', 'Bricks', 'Bamboo'], hint: 'Found in very cold polar regions.', exp: 'Igloos are built from ice blocks.' },
        { q: 'A <strong>houseboat</strong> is a home that floats on...', ans: 'Water', wrong: ['Sand', 'Snow', 'Grass'], hint: 'Famous in Srinagar\'s Dal Lake.', exp: 'Houseboats float on lakes and rivers.' },
        { q: 'Why do houses in hilly, snowy areas have <strong>sloping roofs</strong>?', ans: 'So that snow and rainwater slide off easily', wrong: ['To look beautiful only', 'To store water on the roof', 'To make the house taller'], hint: 'Think about heavy snow piling up.', exp: 'Sloping roofs let snow and rain slide off.' },
        { q: 'Why do houses in hot desert areas have <strong>thick walls and small windows</strong>?', ans: 'To keep the inside cool and block the hot sun', wrong: ['To keep the house dark for fun', 'To save bricks', 'To keep out snow'], hint: 'Heat should stay outside.', exp: 'Thick walls and small windows reduce heat inside.' },
        { q: 'A <strong>stilt house</strong> is built on tall pillars mainly to...', ans: 'Protect from floods and animals', wrong: ['Look tall', 'Catch more wind', 'Save cement'], hint: 'Common in flood-prone areas.', exp: 'Stilt houses stay above flood water.' },
        { q: 'A <strong>tent</strong> is which kind of shelter?', ans: 'Temporary', wrong: ['Permanent', 'Underground', 'Floating'], hint: 'It can be folded and carried.', exp: 'Tents are temporary, movable shelters.' },
        { q: 'Why do we need a house?', ans: 'For safety, shelter from weather and a place to live together', wrong: ['Only to keep furniture', 'Only to show off', 'Only to store food'], hint: 'Think of the basic needs.', exp: 'A house gives protection, safety and family life.' },
        { q: 'Which room of the house is used for cooking?', ans: 'Kitchen', wrong: ['Bedroom', 'Drawing room', 'Bathroom'], hint: 'The stove is kept here.', exp: 'Food is cooked in the kitchen.' }
    ]);

    const evs_ch9_food_bank = bankGenerator('evs_ch9_food', 'Ch-9: Food We Eat', [
        { q: 'Which foods give us <strong>energy</strong>?', ans: 'Rice, wheat, potato and sugar (carbohydrates)', wrong: ['Only water', 'Only salt', 'Only spices'], hint: 'They are energy-giving foods.', exp: 'Carbohydrates such as rice and wheat give energy.' },
        { q: 'Which foods are <strong>body-building</strong> foods?', ans: 'Milk, eggs, pulses, fish and nuts (proteins)', wrong: ['Sugar and jaggery', 'Butter and oil', 'Tea and coffee'], hint: 'They help you grow and repair.', exp: 'Proteins build and repair the body.' },
        { q: 'Which foods are <strong>protective</strong> foods?', ans: 'Fruits and vegetables (vitamins and minerals)', wrong: ['Chips and candy', 'Fried snacks', 'Cold drinks'], hint: 'They protect us from disease.', exp: 'Vitamins and minerals from fruits and vegetables protect us.' },
        { q: 'Which vitamin do we get from <strong>sunlight</strong>?', ans: 'Vitamin D', wrong: ['Vitamin A', 'Vitamin C', 'Vitamin K'], hint: 'It makes bones strong.', exp: 'Sunlight helps our body make Vitamin D.' },
        { q: 'Which vitamin is found in <strong>oranges and amla</strong>?', ans: 'Vitamin C', wrong: ['Vitamin D', 'Vitamin K', 'Vitamin B12'], hint: 'It fights coughs and colds.', exp: 'Citrus fruits and amla are rich in Vitamin C.' },
        { q: 'Carrots and papaya are rich in which vitamin, good for the <strong>eyes</strong>?', ans: 'Vitamin A', wrong: ['Vitamin C', 'Vitamin D', 'Vitamin E'], hint: 'It helps you see in dim light.', exp: 'Vitamin A keeps our eyes healthy.' },
        { q: 'A meal that has all types of nutrients in the right amount is called a...', ans: 'Balanced diet', wrong: ['Fast food meal', 'Junk food meal', 'Sweet dish'], hint: 'Balanced = right mix.', exp: 'A balanced diet contains all nutrients in proper amounts.' },
        { q: 'Why should we wash fruits before eating?', ans: 'To remove dirt, germs and chemicals', wrong: ['To make them shiny', 'To make them heavier', 'To make them sweeter'], hint: 'Hygiene keeps us healthy.', exp: 'Washing removes dirt, germs and pesticide residue.' },
        { q: 'Which of these is <strong>junk food</strong>?', ans: 'Packaged chips and cold drinks', wrong: ['Dal and roti', 'Fruit salad', 'Boiled eggs'], hint: 'Tasty but not nourishing.', exp: 'Junk food has little nutrition and much fat, sugar or salt.' },
        { q: 'Which food do we get from a <strong>plant</strong>?', ans: 'Rice', wrong: ['Milk', 'Egg', 'Honey'], hint: 'It grows in a field.', exp: 'Rice is a plant product.' },
        { q: 'Which food do we get from an <strong>animal</strong>?', ans: 'Milk', wrong: ['Wheat', 'Mango', 'Potato'], hint: 'It comes from cows and buffaloes.', exp: 'Milk is an animal product.' },
        { q: 'Why should we not <strong>waste food</strong>?', ans: 'Because many people go hungry and a lot of effort goes into growing it', wrong: ['Because it is heavy', 'Because it is costly only', 'Because the plate will be dirty'], hint: 'Think about farmers and hungry people.', exp: 'Wasting food wastes resources and denies food to the needy.' }
    ]);

    const evs_ch10_travel_bank = bankGenerator('evs_ch10_travel', 'Ch-10: Travel & Discovery', [
        { q: 'Which is a means of <strong>air</strong> transport?', ans: 'Aeroplane', wrong: ['Bus', 'Ship', 'Bicycle'], hint: 'It flies in the sky.', exp: 'Aeroplanes and helicopters are air transport.' },
        { q: 'Which is a means of <strong>water</strong> transport?', ans: 'Ship', wrong: ['Train', 'Car', 'Aeroplane'], hint: 'It floats.', exp: 'Ships and boats are water transport.' },
        { q: 'Which is a means of <strong>land</strong> transport?', ans: 'Train', wrong: ['Ship', 'Aeroplane', 'Boat'], hint: 'It runs on tracks on the ground.', exp: 'Trains, buses and cars are land transport.' },
        { q: 'Which vehicle causes the <strong>least pollution</strong>?', ans: 'Bicycle', wrong: ['Truck', 'Car', 'Motorcycle'], hint: 'It uses no fuel at all.', exp: 'Bicycles are pollution-free and healthy.' },
        { q: 'What should you do before crossing a road?', ans: 'Look right, then left, then right again', wrong: ['Run across quickly', 'Close your eyes', 'Use the phone while crossing'], hint: 'Road safety rule.', exp: 'Always check both directions before crossing.' },
        { q: 'A <strong>red</strong> traffic light means...', ans: 'Stop', wrong: ['Go', 'Get ready', 'Turn left'], hint: 'Red is a warning colour.', exp: 'Red means stop.' },
        { q: 'A <strong>green</strong> traffic light means...', ans: 'Go', wrong: ['Stop', 'Wait', 'Reverse'], hint: 'It is safe to move.', exp: 'Green means go.' },
        { q: 'The striped path for people to cross a road is called a...', ans: 'Zebra crossing', wrong: ['Flyover', 'Footpath', 'Speed breaker'], hint: 'Black and white stripes.', exp: 'Pedestrians use the zebra crossing.' },
        { q: 'Which instrument helps us find directions?', ans: 'Compass', wrong: ['Thermometer', 'Clock', 'Weighing scale'], hint: 'Its needle always points north.', exp: 'A compass shows directions.' },
        { q: 'How many <strong>main directions</strong> are there?', ans: 4, wrong: [2, 6, 8], hint: 'North, South, East, West.', exp: 'There are 4 cardinal directions.' },
        { q: 'Which is the fastest way to travel a very long distance?', ans: 'Aeroplane', wrong: ['Bullock cart', 'Bicycle', 'Ship'], hint: 'It travels through the air.', exp: 'Aeroplanes are the fastest common transport.' },
        { q: 'Why should we use <strong>public transport</strong> like buses and metro?', ans: 'It reduces traffic and pollution', wrong: ['It is always empty', 'It is slower', 'It uses more fuel per person'], hint: 'Many people travel in one vehicle.', exp: 'Public transport cuts traffic jams and pollution per person.' }
    ]);

    const evsGenerators = {
        evs_ch1_family: evs_ch1_family_bank,
        evs_ch2_caring: evs_ch2_caring_bank,
        evs_ch3_festivals: mix(evs_ch3_festivals_proc, evs_ch3_festivals_bank),
        evs_ch4_plants: mix(evs_ch4_plants_proc, evs_ch4_plants_bank),
        evs_ch5_coexistence: evs_ch5_coexistence_bank,
        evs_ch6_harmony: evs_ch6_harmony_bank,
        evs_ch7_water: evs_ch7_water_bank,
        evs_ch8_shelter: evs_ch8_shelter_bank,
        evs_ch9_food: evs_ch9_food_bank,
        evs_ch10_travel: evs_ch10_travel_bank
    };

    /* ===============================================================
     * Extra practice-paper questions
     * Modelled on Our Wondrous World exercises and common Class 3
     * EVS worksheet and exam patterns.
     * =============================================================== */
    const PAPER = {
        evs_ch1_family: [
            { q: 'Your mother\'s sister is your...', ans: 'Aunt (mausi)', wrong: ['Cousin', 'Niece', 'Grandmother'], hint: 'She is your mother\'s sibling.', exp: 'Mother\'s sister is your maternal aunt (mausi).' },
            { q: 'Your father\'s brother is your...', ans: 'Uncle (chacha)', wrong: ['Cousin', 'Nephew', 'Brother'], hint: 'He is your father\'s sibling.', exp: 'Father\'s brother is your paternal uncle (chacha).' },
            { q: 'Your brother\'s son is your...', ans: 'Nephew', wrong: ['Cousin', 'Uncle', 'Niece'], hint: 'A boy one generation below you.', exp: 'Your brother\'s son is your nephew.' },
            { q: 'Which of these is a <strong>duty</strong> of every family member?', ans: 'Helping and caring for one another', wrong: ['Only earning money', 'Only cooking food', 'Only watching TV'], hint: 'Families share work and love.', exp: 'Everyone in a family helps and cares for the others.' },
            { q: 'Why do family members look a little alike?', ans: 'Because children inherit features from their parents', wrong: ['Because they eat the same food', 'Because they wear same clothes', 'It is only a coincidence'], hint: 'Traits pass from parents to children.', exp: 'Features such as eye colour are inherited.' },
            { q: 'Twins born on the same day are called...', ans: 'Twins', wrong: ['Cousins', 'Triplets', 'Siblings only'], hint: 'Two babies born together.', exp: 'Two children born together are twins.' }
        ],
        evs_ch2_caring: [
            { q: 'What should you do if a friend falls and hurts their knee?', ans: 'Help them up and tell a teacher or adult', wrong: ['Laugh at them', 'Run away', 'Ignore them'], hint: 'Be kind and get help.', exp: 'Helping and calling an adult is the caring thing to do.' },
            { q: 'How can we care for a pet dog?', ans: 'Give it food, clean water, a bath and love', wrong: ['Keep it tied all day', 'Give only sweets', 'Never take it outside'], hint: 'Pets need food, water and exercise.', exp: 'Pets need food, water, cleanliness, exercise and affection.' },
            { q: 'How should we treat people who are differently abled?', ans: 'With respect, and help them when they need it', wrong: ['Stare at them', 'Make fun of them', 'Avoid them'], hint: 'Everyone deserves respect.', exp: 'We treat everyone with respect and offer help kindly.' },
            { q: 'Which is a good habit at home?', ans: 'Putting your toys back after playing', wrong: ['Leaving things scattered', 'Shouting at elders', 'Wasting food'], hint: 'Think about tidiness.', exp: 'Tidying up is a helpful habit.' },
            { q: 'What should you do before eating?', ans: 'Wash your hands with soap', wrong: ['Watch television', 'Play outside', 'Nothing at all'], hint: 'Hygiene stops germs.', exp: 'Washing hands with soap keeps germs away.' }
        ],
        evs_ch3_festivals: [
            { q: 'Which festival is celebrated with <strong>rakhi</strong>?', ans: 'Raksha Bandhan', wrong: ['Diwali', 'Holi', 'Pongal'], hint: 'Sisters tie a thread on brothers\' wrists.', exp: 'Raksha Bandhan celebrates the bond of brothers and sisters.' },
            { q: 'Which festival celebrates the birth of Guru Nanak?', ans: 'Gurpurab', wrong: ['Baisakhi', 'Lohri', 'Onam'], hint: 'A Sikh festival.', exp: 'Gurpurab marks Guru Nanak\'s birth anniversary.' },
            { q: 'On which festival do people fly kites in Gujarat?', ans: 'Makar Sankranti (Uttarayan)', wrong: ['Holi', 'Diwali', 'Christmas'], hint: 'Celebrated in January.', exp: 'Makar Sankranti is the kite-flying harvest festival.' },
            { q: 'Which of these is a <strong>national</strong> festival?', ans: 'Republic Day', wrong: ['Diwali', 'Eid', 'Onam'], hint: 'Celebrated by the whole country.', exp: 'Republic Day is a national festival.' },
            { q: 'What should we avoid during Diwali to protect animals?', ans: 'Loud crackers', wrong: ['Lighting diyas', 'Making rangoli', 'Sharing sweets'], hint: 'Loud noises frighten animals.', exp: 'Crackers scare animals and pollute the air.' },
            { q: 'Which festival is celebrated with <strong>Christmas trees and carols</strong>?', ans: 'Christmas', wrong: ['Eid', 'Holi', 'Bihu'], hint: 'Celebrated on 25 December.', exp: 'Christmas is celebrated on 25 December.' },
            { q: 'Why do we celebrate festivals together with neighbours?', ans: 'It builds friendship and respect for all religions', wrong: ['To make noise', 'To waste money', 'To skip school'], hint: 'Think about unity.', exp: 'Sharing festivals builds harmony and respect for diversity.' }
        ],
        evs_ch4_plants: [
            { q: 'Which part of the potato plant do we eat?', ans: 'Stem (underground)', wrong: ['Root', 'Leaf', 'Flower'], hint: 'It is an underground stem called a tuber.', exp: 'Potato is a modified underground stem.' },
            { q: 'Which of these plants has a <strong>weak stem that climbs</strong>?', ans: 'Grapevine', wrong: ['Mango tree', 'Neem tree', 'Grass'], hint: 'It needs support.', exp: 'A grapevine is a climber.' },
            { q: 'Which plants are small with soft green stems?', ans: 'Herbs', wrong: ['Trees', 'Shrubs', 'Climbers'], hint: 'Like coriander or mint.', exp: 'Herbs are small plants with soft stems.' },
            { q: 'Plants that are medium-sized with hard woody stems near the ground are called...', ans: 'Shrubs', wrong: ['Herbs', 'Trees', 'Creepers'], hint: 'Like a rose or tulsi bush.', exp: 'Shrubs are bushy plants with woody stems.' },
            { q: 'What do plants need to grow?', ans: 'Sunlight, water, air and soil', wrong: ['Only water', 'Only soil', 'Only darkness'], hint: 'Four basic things.', exp: 'Plants need sunlight, water, air and nutrients from soil.' },
            { q: 'What happens to a plant kept in complete darkness?', ans: 'It turns pale and slowly dies', wrong: ['It grows faster', 'It becomes greener', 'Nothing happens'], hint: 'Leaves need light to make food.', exp: 'Without light, a plant cannot make food and dies.' },
            { q: 'Which part of the plant grows <strong>downwards</strong>?', ans: 'Root', wrong: ['Stem', 'Leaf', 'Flower'], hint: 'It goes into the soil.', exp: 'Roots grow downward into the soil.' },
            { q: 'A tap root has...', ans: 'One thick main root with smaller side roots', wrong: ['Many thin roots of equal size', 'No roots at all', 'Only leaves'], hint: 'Like a carrot.', exp: 'A tap root has one main root, e.g. carrot or radish.' }
        ],
        evs_ch5_coexistence: [
            { q: 'Which animal helps the farmer by eating harmful insects?', ans: 'Frog', wrong: ['Rat', 'Locust', 'Termite'], hint: 'It lives near ponds and fields.', exp: 'Frogs eat insect pests that harm crops.' },
            { q: 'In a food chain, the sun gives energy to...', ans: 'Green plants', wrong: ['Lions', 'Snakes', 'Eagles'], hint: 'Only plants use sunlight directly.', exp: 'Plants capture the sun\'s energy first.' },
            { q: 'Which is a <strong>herbivore</strong>?', ans: 'Deer', wrong: ['Tiger', 'Eagle', 'Snake'], hint: 'It eats only plants.', exp: 'A deer eats grass and leaves.' },
            { q: 'Which is a <strong>carnivore</strong>?', ans: 'Lion', wrong: ['Cow', 'Goat', 'Rabbit'], hint: 'It eats only meat.', exp: 'A lion is a flesh-eater.' },
            { q: 'How do plants help animals?', ans: 'They give food, oxygen and shelter', wrong: ['They eat animals', 'They give only shade', 'They do not help'], hint: 'Think of food, air and homes.', exp: 'Plants provide food, oxygen and shelter.' },
            { q: 'Why should we not cut down too many trees?', ans: 'Animals lose homes and the air gets polluted', wrong: ['Trees are too tall', 'Trees make noise', 'Trees use too much water'], hint: 'Trees are homes and air cleaners.', exp: 'Deforestation destroys habitats and worsens air quality.' },
            { q: 'Which animal gives us honey?', ans: 'Honeybee', wrong: ['Butterfly', 'Ant', 'Spider'], hint: 'It makes it in a hive.', exp: 'Honeybees make honey.' },
            { q: 'Which animal helps us carry loads on farms?', ans: 'Bullock', wrong: ['Cat', 'Parrot', 'Rabbit'], hint: 'It pulls carts and ploughs.', exp: 'Bullocks pull ploughs and carts.' }
        ],
        evs_ch6_harmony: [
            { q: 'What does <strong>reuse</strong> mean?', ans: 'Using something again instead of throwing it away', wrong: ['Burning it', 'Buying a new one', 'Throwing it in a river'], hint: 'Use it a second time.', exp: 'Reuse means using an item again.' },
            { q: 'Which of these is <strong>biodegradable</strong>?', ans: 'Vegetable peels', wrong: ['Plastic bottle', 'Glass jar', 'Aluminium foil'], hint: 'It rots away naturally.', exp: 'Vegetable peels decompose naturally.' },
            { q: 'What can we make from wet kitchen waste?', ans: 'Compost (natural manure)', wrong: ['Plastic', 'Glass', 'Paper'], hint: 'It feeds the soil.', exp: 'Wet waste can be composted into manure.' },
            { q: 'Switching off lights and fans when leaving a room saves...', ans: 'Electricity', wrong: ['Water', 'Paper', 'Food'], hint: 'Lights run on power.', exp: 'It conserves electricity.' },
            { q: 'Which is the best way to travel a short distance?', ans: 'Walk or cycle', wrong: ['Take a car alone', 'Take a motorbike', 'Take a truck'], hint: 'No fuel and good for health.', exp: 'Walking and cycling cause no pollution.' },
            { q: 'What should we do with a leaking tap?', ans: 'Get it repaired quickly', wrong: ['Let it drip', 'Cover it with cloth', 'Ignore it'], hint: 'A drip wastes many litres a day.', exp: 'Repairing leaks saves a lot of water.' },
            { q: 'Why should we not throw rubbish into rivers?', ans: 'It harms fish and pollutes drinking water', wrong: ['It makes the river deeper', 'It helps plants grow', 'It has no effect'], hint: 'Many people drink river water.', exp: 'Dumping waste pollutes water and kills aquatic life.' }
        ],
        evs_ch7_water: [
            { q: 'Which of these is a <strong>man-made</strong> source of water?', ans: 'Well', wrong: ['River', 'Rain', 'Sea'], hint: 'People dig it.', exp: 'Wells, tanks and taps are man-made sources.' },
            { q: 'The continuous movement of water between earth and sky is called the...', ans: 'Water cycle', wrong: ['Life cycle', 'Food chain', 'Rock cycle'], hint: 'Evaporation → condensation → rain.', exp: 'It is called the water cycle.' },
            { q: 'Which activity uses the <strong>most</strong> water at home?', ans: 'Bathing and washing', wrong: ['Drinking', 'Brushing teeth', 'Cooking rice'], hint: 'Think of buckets and showers.', exp: 'Bathing and washing use the most water.' },
            { q: 'Ice is water in which state?', ans: 'Solid', wrong: ['Liquid', 'Gas', 'Vapour'], hint: 'You can hold it.', exp: 'Ice is the solid form of water.' },
            { q: 'Steam is water in which state?', ans: 'Gas', wrong: ['Solid', 'Liquid', 'Ice'], hint: 'It rises from boiling water.', exp: 'Steam is water vapour, a gas.' },
            { q: 'Why should we cover stored drinking water?', ans: 'To keep out dust, insects and germs', wrong: ['To keep it warm', 'To make it tasty', 'To make it heavier'], hint: 'Uncovered water gets dirty.', exp: 'Covering keeps water clean and safe.' },
            { q: 'Mosquitoes breed in...', ans: 'Stagnant (still) water', wrong: ['Fast flowing rivers', 'Boiling water', 'Dry sand'], hint: 'Water left standing in pots and coolers.', exp: 'Still water is where mosquitoes lay eggs.' }
        ],
        evs_ch8_shelter: [
            { q: 'Animals that live in a <strong>burrow</strong> include...', ans: 'Rabbits and rats', wrong: ['Birds', 'Fish', 'Monkeys'], hint: 'A hole dug in the ground.', exp: 'Rabbits and rats live in burrows.' },
            { q: 'A <strong>tent</strong> is most useful for...', ans: 'People who travel from place to place', wrong: ['People living in one city forever', 'Very rich families only', 'Nobody'], hint: 'It can be packed and carried.', exp: 'Tents suit nomadic or travelling people.' },
            { q: 'Which material keeps a house cool in a hot place?', ans: 'Thick mud walls', wrong: ['Thin tin sheets', 'Glass walls', 'Black plastic'], hint: 'Thick walls block heat.', exp: 'Mud walls keep interiors cool.' },
            { q: 'Which people live in <strong>houseboats</strong>?', ans: 'Some people in Kashmir', wrong: ['People in the Thar desert', 'People in Antarctica', 'People in Delhi only'], hint: 'On the Dal Lake.', exp: 'Houseboats are common on Kashmir\'s Dal Lake.' },
            { q: 'Who builds our houses?', ans: 'Masons, carpenters, plumbers and electricians', wrong: ['Only doctors', 'Only teachers', 'Only farmers'], hint: 'Many workers with different skills.', exp: 'Many skilled workers build a house together.' },
            { q: 'Why should we keep our house clean?', ans: 'To stay healthy and keep germs away', wrong: ['To make it bigger', 'To make it costly', 'For no reason'], hint: 'Dirt brings illness.', exp: 'Cleanliness prevents disease.' },
            { q: 'A <strong>bird</strong> makes its home called a...', ans: 'Nest', wrong: ['Burrow', 'Stable', 'Web'], hint: 'Built of twigs and grass.', exp: 'Birds build nests.' }
        ],
        evs_ch9_food: [
            { q: 'Which meal do we eat in the morning?', ans: 'Breakfast', wrong: ['Lunch', 'Dinner', 'Supper'], hint: 'It breaks the night\'s fast.', exp: 'Breakfast is the morning meal.' },
            { q: 'Which food gives us the <strong>most energy</strong>?', ans: 'Rice and roti', wrong: ['Water', 'Salt', 'Pickle'], hint: 'Carbohydrates give energy.', exp: 'Cereals like rice and wheat are energy foods.' },
            { q: 'Which is a good <strong>protein</strong> food for a vegetarian?', ans: 'Dal (pulses)', wrong: ['Sugar', 'Oil', 'Tea'], hint: 'Pulses build the body.', exp: 'Dal and pulses are rich in protein.' },
            { q: 'Why must we drink plenty of water?', ans: 'It keeps the body cool and helps digestion', wrong: ['It makes us taller', 'It makes food tasty', 'It has no use'], hint: 'Our body is mostly water.', exp: 'Water regulates temperature and aids digestion.' },
            { q: 'Which food should we eat <strong>less</strong> often?', ans: 'Fried and sugary snacks', wrong: ['Fresh fruit', 'Green vegetables', 'Milk'], hint: 'Tasty but unhealthy.', exp: 'Fried and sugary foods should be occasional treats.' },
            { q: 'Food that has gone bad and smells is said to be...', ans: 'Spoilt', wrong: ['Fresh', 'Cooked', 'Raw'], hint: 'It is unsafe to eat.', exp: 'Spoilt food must not be eaten.' },
            { q: 'How can we keep food fresh for longer?', ans: 'Store it covered in a refrigerator', wrong: ['Leave it open in the sun', 'Keep it on the floor', 'Mix it with water'], hint: 'Cold slows down spoiling.', exp: 'Refrigeration and covering keep food fresh.' },
            { q: 'Which of these do we get from a <strong>hen</strong>?', ans: 'Eggs', wrong: ['Milk', 'Wool', 'Honey'], hint: 'Laid in a nest.', exp: 'Hens give us eggs.' }
        ],
        evs_ch10_travel: [
            { q: 'Which vehicle carries sick people quickly to hospital?', ans: 'Ambulance', wrong: ['Bus', 'Truck', 'Tractor'], hint: 'It has a siren.', exp: 'An ambulance carries patients.' },
            { q: 'Which of these is the <strong>oldest</strong> means of transport?', ans: 'Bullock cart', wrong: ['Aeroplane', 'Metro train', 'Car'], hint: 'Used long before engines.', exp: 'Animal-drawn carts came long before engines.' },
            { q: 'Where should you wait for a bus?', ans: 'At the bus stop, away from the road', wrong: ['In the middle of the road', 'On the divider', 'Behind the bus'], hint: 'Safety first.', exp: 'Always wait at the bus stop.' },
            { q: 'What should you wear while riding a bicycle or two-wheeler?', ans: 'A helmet', wrong: ['A cap', 'Sunglasses only', 'Nothing'], hint: 'It protects your head.', exp: 'A helmet protects you in a fall.' },
            { q: 'A <strong>yellow</strong> traffic light means...', ans: 'Get ready to stop', wrong: ['Go fast', 'Reverse', 'Turn around'], hint: 'It comes between green and red.', exp: 'Yellow warns you to slow down and get ready to stop.' },
            { q: 'Which direction does a compass needle always point?', ans: 'North', wrong: ['South', 'East', 'West'], hint: 'The magnetic needle.', exp: 'A compass needle points north.' },
            { q: 'Which transport runs on rails?', ans: 'Train', wrong: ['Bus', 'Ship', 'Aeroplane'], hint: 'It needs tracks.', exp: 'Trains run on railway tracks.' },
            { q: 'Which is used to carry goods over long distances by road?', ans: 'Truck', wrong: ['Cycle', 'Scooter', 'Rickshaw'], hint: 'It is big with a large carrier.', exp: 'Trucks carry heavy goods by road.' }
        ]
    };

    const PAPER_BADGES = {
        evs_ch1_family: 'Ch-1: My Family and Me',
        evs_ch2_caring: 'Ch-2: Caring & Sharing',
        evs_ch3_festivals: 'Ch-3: Festivals',
        evs_ch4_plants: 'Ch-4: Plants',
        evs_ch5_coexistence: 'Ch-5: Plants & Animals Together',
        evs_ch6_harmony: 'Ch-6: Living in Harmony',
        evs_ch7_water: 'Ch-7: Water for Life',
        evs_ch8_shelter: 'Ch-8: Our Shelter',
        evs_ch9_food: 'Ch-9: Food We Eat',
        evs_ch10_travel: 'Ch-10: Travel & Discovery'
    };

    Object.keys(PAPER).forEach((key) => {
        const extra = bankGenerator(key, PAPER_BADGES[key] || 'EVS', PAPER[key]);
        evsGenerators[key] = evsGenerators[key] ? mix(evsGenerators[key], extra) : extra;
    });

    B.registerBook({
        subject: 'evs',
        book: 'NCERT Our Wondrous World (Class 3)',
        generators: evsGenerators,
        topics: [
                { id: 'all', label: '🌟 All EVS Chapters (Mixed Practice)' },
                { id: 'evs_ch1_family', label: 'Ch-1: My Family and Me' },
                { id: 'evs_ch2_caring', label: 'Ch-2: Caring & Sharing' },
                { id: 'evs_ch3_festivals', label: 'Ch-3: Celebrating Festivals' },
                { id: 'evs_ch4_plants', label: 'Ch-4: Getting to Know Plants' },
                { id: 'evs_ch5_coexistence', label: 'Ch-5: Plants & Animals Live Together' },
                { id: 'evs_ch6_harmony', label: 'Ch-6: Living in Harmony' },
                { id: 'evs_ch7_water', label: 'Ch-7: Water for Life' },
                { id: 'evs_ch8_shelter', label: 'Ch-8: Our Shelter & Houses' },
                { id: 'evs_ch9_food', label: 'Ch-9: Food We Eat' },
                { id: 'evs_ch10_travel', label: 'Ch-10: Travel, Transport & Directions' }
            ]
    });

})(typeof window !== 'undefined' ? window : globalThis);
