import React, { useState, useEffect, useCallback , useRef} from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image, ScrollView ,ImageBackground } from 'react-native';
import Draggable from 'react-native-draggable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { useVibration } from './VibrationContext';
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};


const quizzes = {
    1: [
        {
            type: 'multipleChoice',
            text: 'What is the name of the largest annual festival in Halifax?',
            options: [
                { text: 'Halifax Pop Explosion', isCorrect: false },
                { text: 'Atlantic Film Festival', isCorrect: false },
                { text: 'Halifax International Busker Festival', isCorrect: false },
                { text: 'Celtic Colours International Festival', isCorrect: true }
            ],
            fact: 'The Halifax International Busker Festival features street performers from around the world and attracts thousands of visitors each summer.'
        },
        {
            type: 'multipleChoice',
            text: 'Which festival celebrates Nova Scotia’s Acadian culture?',
            options: [
                { text: 'Celtic Colours International Festival', isCorrect: false },
                { text: 'Festival Acadien de Clare', isCorrect: true },
                { text: 'Halifax Oyster Festival', isCorrect: false },
                { text: 'Royal Nova Scotia International Tattoo', isCorrect: false }
            ],
            fact: 'The Festival Acadien de Clare is one of the oldest Acadian festivals in the world, showcasing music, dance, and Acadian cuisine.'
        },
        {
            type: 'multipleChoice',
            text: 'What event is known as the world’s largest indoor show?',
            options: [
                { text: 'Halifax International Boat Show', isCorrect: false },
                { text: 'Royal Nova Scotia International Tattoo', isCorrect: true },
                { text: 'Halifax Seaport Beerfest', isCorrect: false },
                { text: 'Stan Rogers Folk Festival', isCorrect: false }
            ],
            fact: 'The Royal Nova Scotia International Tattoo features military and civilian performers from around the world and is a major attraction in Halifax each summer.'
        },
        {
            type: 'multipleChoice',
            text: 'Which festival is held in Baddeck and celebrates Celtic culture?',
            options: [
                { text: 'Halifax Pop Explosion', isCorrect: false },
                { text: 'Celtic Colours International Festival', isCorrect: true },
                { text: 'Nova Scotia Multicultural Festival', isCorrect: false },
                { text: 'East Coast Music Awards', isCorrect: false }
            ],
            fact: 'The Celtic Colours International Festival takes place in October and features concerts, workshops, and community events celebrating Celtic music and culture.'
        },
        {
            type: 'multipleChoice',
            text: 'What is the focus of the Stan Rogers Folk Festival?',
            options: [
                { text: 'Classical Music', isCorrect: false },
                { text: 'Folk Music', isCorrect: true },
                { text: 'Jazz Music', isCorrect: false },
                { text: 'Rock Music', isCorrect: false }
            ],
            fact: 'Named after the legendary Canadian folk musician Stan Rogers, the festival is held annually in Canso and attracts folk artists from across North America.'
        },
        {
            type: 'multipleChoice',
            text: 'Which event is known for its culinary focus on seafood, particularly oysters?',
            options: [
                { text: 'Halifax Oyster Festival', isCorrect: true },
                { text: 'Nova Scotia Lobster Crawl', isCorrect: false },
                { text: 'Right Some Good', isCorrect: false },
                { text: 'Devour! The Food Film Fest', isCorrect: false }
            ],
            fact: 'The Halifax Oyster Festival is a popular event where visitors can sample oysters from Nova Scotia and beyond, alongside wine and craft beer pairings.'
        },
        {
            type: 'multipleChoice',
            text: 'What event combines film and food in Wolfville?',
            options: [
                { text: 'Atlantic Film Festival', isCorrect: false },
                { text: 'Devour! The Food Film Fest', isCorrect: true },
                { text: 'Festival Antigonish Summer Theatre', isCorrect: false },
                { text: 'Annapolis Valley Apple Blossom Festival', isCorrect: false }
            ],
            fact: 'Devour! The Food Film Fest is the world\'s largest food film festival, showcasing culinary-themed films and offering gourmet food experiences.'
        },
        {
            type: 'multipleChoice',
            text: 'Which festival celebrates the apple harvest in the Annapolis Valley?',
            options: [
                { text: 'Celtic Colours International Festival', isCorrect: false },
                { text: 'Stan Rogers Folk Festival', isCorrect: false },
                { text: 'Halifax International Busker Festival', isCorrect: false },
                { text: 'Annapolis Valley Apple Blossom Festival', isCorrect: true }
            ],
            fact: 'The Annapolis Valley Apple Blossom Festival features parades, concerts, and agricultural exhibitions, celebrating the region\'s apple-growing heritage.'
        },
        {
            type: 'multipleChoice',
            text: 'What event showcases diverse cultural performances and cuisine in Halifax?',
            options: [
                { text: 'Nova Scotia Multicultural Festival', isCorrect: true },
                { text: 'Halifax Seaport Beerfest', isCorrect: false },
                { text: 'Royal Nova Scotia International Tattoo', isCorrect: false },
                { text: 'East Coast Music Awards', isCorrect: false }
            ],
            fact: 'The Nova Scotia Multicultural Festival brings together communities from around the world to celebrate their unique traditions, music, and food.'
        },
        {
            type: 'multipleChoice',
            text: 'Which music festival is held in Sydney and focuses on East Coast music?',
            options: [
                { text: 'Celtic Colours International Festival', isCorrect: false },
                { text: 'East Coast Music Awards', isCorrect: true },
                { text: 'Halifax Pop Explosion', isCorrect: false },
                { text: 'Festival Acadien de Clare', isCorrect: false }
            ],
            fact: 'The East Coast Music Awards is an annual event that celebrates the best of East Coast music, including genres like folk, rock, and traditional Maritime music.'
        }
    ],
    2: [
        {
            type: 'multipleChoice',
            text: 'What is the average annual temperature in Halifax?',
            options: [
                { text: '8°C', isCorrect: true },
                { text: '5°C', isCorrect: false },
                { text: '10°C', isCorrect: false },
                { text: '12°C', isCorrect: false }
            ],
            fact: 'Halifax has a moderate climate with an average annual temperature of around 8°C, influenced by its coastal location.'
        },
        {
            type: 'multipleChoice',
            text: 'Which season is known for the highest precipitation in Nova Scotia?',
            options: [
                { text: 'Spring', isCorrect: false },
                { text: 'Summer', isCorrect: false },
                { text: 'Fall', isCorrect: false },
                { text: 'Winter', isCorrect: true }
            ],
            fact: 'Winter is typically the wettest season in Nova Scotia, with heavy snowfall and frequent rainstorms.'
        },
        {
            type: 'multipleChoice',
            text: 'What weather phenomenon commonly affects Nova Scotia in the fall?',
            options: [
                { text: 'Tornadoes', isCorrect: false },
                { text: 'Hurricanes', isCorrect: true },
                { text: 'Droughts', isCorrect: false },
                { text: 'Heatwaves', isCorrect: false }
            ],
            fact: 'Nova Scotia is often affected by hurricanes and tropical storms in the fall, which can bring strong winds and heavy rain.'
        },
        {
            type: 'multipleChoice',
            text: 'What is the coldest month on average in Nova Scotia?',
            options: [
                { text: 'January', isCorrect: true },
                { text: 'February', isCorrect: false },
                { text: 'December', isCorrect: false },
                { text: 'March', isCorrect: false }
            ],
            fact: 'January is the coldest month in Nova Scotia, with average temperatures often dropping below freezing.'
        },
        {
            type: 'multipleChoice',
            text: 'Which region of Nova Scotia experiences the most snowfall?',
            options: [
                { text: 'Halifax', isCorrect: false },
                { text: 'Annapolis Valley', isCorrect: false },
                { text: 'Cape Breton Highlands', isCorrect: true },
                { text: 'South Shore', isCorrect: false }
            ],
            fact: 'The Cape Breton Highlands receive the most snowfall in Nova Scotia due to their elevation and proximity to the Gulf of St. Lawrence.'
        },
        {
            type: 'multipleChoice',
            text: 'What is the driest month on average in Nova Scotia?',
            options: [
                { text: 'June', isCorrect: false },
                { text: 'August', isCorrect: true },
                { text: 'October', isCorrect: false },
                { text: 'April', isCorrect: false }
            ],
            fact: 'August is typically the driest month in Nova Scotia, with lower precipitation compared to other months.'
        },
        {
            type: 'multipleChoice',
            text: 'What ocean current influences Nova Scotia’s climate?',
            options: [
                { text: 'Gulf Stream', isCorrect: true },
                { text: 'Labrador Current', isCorrect: false },
                { text: 'California Current', isCorrect: false },
                { text: 'North Atlantic Drift', isCorrect: false }
            ],
            fact: 'The Gulf Stream moderates the climate of Nova Scotia, bringing warm water from the Gulf of Mexico and influencing the region’s weather patterns.'
        },
        {
            type: 'multipleChoice',
            text: 'What is the average annual precipitation in Nova Scotia?',
            options: [
                { text: '900 mm', isCorrect: false },
                { text: '1,200 mm', isCorrect: true },
                { text: '1,500 mm', isCorrect: false },
                { text: '1,800 mm', isCorrect: false }
            ],
            fact: 'Nova Scotia receives an average of about 1,200 mm of precipitation annually, including both rain and snow.'
        },
        {
            type: 'multipleChoice',
            text: 'Which season is known for foggy conditions in Nova Scotia?',
            options: [
                { text: 'Spring', isCorrect: false },
                { text: 'Summer', isCorrect: true },
                { text: 'Fall', isCorrect: false },
                { text: 'Winter', isCorrect: false }
            ],
            fact: 'Summer is known for frequent fog in Nova Scotia, especially along the coast, due to the mixing of warm air and cold ocean waters.'
        },
        {
            type: 'multipleChoice',
            text: 'What is a common summer weather event in Nova Scotia?',
            options: [
                { text: 'Thunderstorms', isCorrect: true },
                { text: 'Blizzards', isCorrect: false },
                { text: 'Dust Storms', isCorrect: false },
                { text: 'Tornadoes', isCorrect: false }
            ],
            fact: 'Thunderstorms are common in Nova Scotia during the summer, often bringing heavy rain, lightning, and occasional hail.'
        }
    ],
    3: [
        {
            type: 'multipleChoice',
            text: 'Which park is known for its stunning cliffs and ocean views on Cape Breton Island?',
            options: [
                { text: 'Cape Breton Highlands National Park', isCorrect: true },
                { text: 'Kejimkujik National Park', isCorrect: false },
                { text: 'Blomidon Provincial Park', isCorrect: false },
                { text: 'Thomas Raddall Provincial Park', isCorrect: false }
            ],
            fact: 'Cape Breton Highlands National Park features the famous Cabot Trail, offering breathtaking coastal scenery and numerous hiking opportunities.'
        },
        {
            type: 'multipleChoice',
            text: 'What activity is Kejimkujik National Park known for?',
            options: [
                { text: 'Whale Watching', isCorrect: false },
                { text: 'Canoeing and Kayaking', isCorrect: true },
                { text: 'Rock Climbing', isCorrect: false },
                { text: 'Skiing', isCorrect: false }
            ],
            fact: 'Kejimkujik National Park is renowned for its canoe routes, lakes, and rivers, making it a popular destination for paddlers.'
        },
        {
            type: 'multipleChoice',
            text: 'Which provincial park is famous for its tidal bore rafting?',
            options: [
                { text: 'Blomidon Provincial Park', isCorrect: false },
                { text: 'Shubenacadie Wildlife Park', isCorrect: false },
                { text: 'Five Islands Provincial Park', isCorrect: true },
                { text: 'Porters Lake Provincial Park', isCorrect: false }
            ],
            fact: 'Five Islands Provincial Park offers thrilling tidal bore rafting experiences on the Shubenacadie River, where visitors can ride the waves created by the Bay of Fundy\'s tides.'
        },
        {
            type: 'multipleChoice',
            text: 'What is a popular winter activity in Cape Smokey Provincial Park?',
            options: [
                { text: 'Surfing', isCorrect: false },
                { text: 'Snowshoeing', isCorrect: true },
                { text: 'Birdwatching', isCorrect: false },
                { text: 'Sailing', isCorrect: false }
            ],
            fact: 'Cape Smokey Provincial Park is a prime location for snowshoeing in the winter, offering scenic trails through snow-covered forests.'
        },
        {
            type: 'multipleChoice',
            text: 'Which park features a dramatic view of the Bay of Fundy’s tides?',
            options: [
                { text: 'Dollar Lake Provincial Park', isCorrect: false },
                { text: 'Thomas Raddall Provincial Park', isCorrect: false },
                { text: 'Blomidon Provincial Park', isCorrect: true },
                { text: 'Mira River Provincial Park', isCorrect: false }
            ],
            fact: 'Blomidon Provincial Park provides stunning views of the Bay of Fundy, known for having the highest tides in the world.'
        },
        {
            type: 'multipleChoice',
            text: 'Where can you find the Skyline Trail with its iconic views?',
            options: [
                { text: 'Cape Breton Highlands National Park', isCorrect: true },
                { text: 'Kejimkujik National Park', isCorrect: false },
                { text: 'Taylor Head Provincial Park', isCorrect: false },
                { text: 'Porters Lake Provincial Park', isCorrect: false }
            ],
            fact: 'The Skyline Trail in Cape Breton Highlands National Park offers spectacular vistas of the Gulf of St. Lawrence and is famous for its sunset views.'
        },
        {
            type: 'multipleChoice',
            text: 'What activity is popular at Porters Lake Provincial Park?',
            options: [
                { text: 'Rock Climbing', isCorrect: false },
                { text: 'Canoeing and Kayaking', isCorrect: true },
                { text: 'Skiing', isCorrect: false },
                { text: 'Birdwatching', isCorrect: false }
            ],
            fact: 'Porters Lake Provincial Park is a favored spot for canoeing and kayaking, with calm waters and scenic surroundings.'
        },
        {
            type: 'multipleChoice',
            text: 'Which provincial park is known for its diverse bird population?',
            options: [
                { text: 'Blomidon Provincial Park', isCorrect: false },
                { text: 'Mira River Provincial Park', isCorrect: false },
                { text: 'Cape Chignecto Provincial Park', isCorrect: false },
                { text: 'Thomas Raddall Provincial Park', isCorrect: true }
            ],
            fact: 'Thomas Raddall Provincial Park is a haven for birdwatchers, with a variety of bird species inhabiting its forests, wetlands, and coastline.'
        },
        {
            type: 'multipleChoice',
            text: 'What unique natural feature can be seen at Burntcoat Head Park?',
            options: [
                { text: 'Waterfalls', isCorrect: false },
                { text: 'Tidal Bore', isCorrect: false },
                { text: 'Tidal Flats', isCorrect: true },
                { text: 'Sand Dunes', isCorrect: false }
            ],
            fact: 'Burntcoat Head Park is famous for its tidal flats, where visitors can walk on the ocean floor during low tide and witness the dramatic rise and fall of the Bay of Fundy\'s tides.'
        },
        {
            type: 'multipleChoice',
            text: 'Which activity is popular in Taylor Head Provincial Park?',
            options: [
                { text: 'Sailing', isCorrect: false },
                { text: 'Hiking', isCorrect: true },
                { text: 'Rock Climbing', isCorrect: false },
                { text: 'Skiing', isCorrect: false }
            ],
            fact: 'Taylor Head Provincial Park offers numerous hiking trails that provide stunning views of the Atlantic Ocean and access to secluded beaches.'
        }
    ],
    
    4: [
        {
            type: 'multipleChoice',
            text: 'What is the main airport in Nova Scotia?',
            options: [
                { text: 'Sydney/J.A. Douglas McCurdy Airport', isCorrect: false },
                { text: 'Halifax Stanfield International Airport', isCorrect: true },
                { text: 'Yarmouth Airport', isCorrect: false },
                { text: 'Greenwood Airport', isCorrect: false }
            ],
            fact: 'Halifax Stanfield International Airport is the primary airport in Nova Scotia, serving as a major hub for domestic and international flights.'
        },
        {
            type: 'multipleChoice',
            text: 'Which ferry service connects Nova Scotia with Newfoundland?',
            options: [
                { text: 'Bay Ferries', isCorrect: false },
                { text: 'Marine Atlantic', isCorrect: true },
                { text: 'Digby-Saint John Ferry', isCorrect: false },
                { text: 'Halifax-Dartmouth Ferry', isCorrect: false }
            ],
            fact: 'Marine Atlantic operates ferry services between North Sydney, Nova Scotia, and Newfoundland, providing vital transportation links across the Cabot Strait.'
        },
        {
            type: 'multipleChoice',
            text: 'What is the primary highway running through Nova Scotia?',
            options: [
                { text: 'Highway 101', isCorrect: false },
                { text: 'Highway 104', isCorrect: true },
                { text: 'Highway 103', isCorrect: false },
                { text: 'Highway 107', isCorrect: false }
            ],
            fact: 'Highway 104, part of the Trans-Canada Highway system, is the main east-west route through Nova Scotia, connecting to New Brunswick and Cape Breton Island.'
        },
        {
            type: 'multipleChoice',
            text: 'Which bridge connects Halifax and Dartmouth?',
            options: [
                { text: 'MacKay Bridge', isCorrect: false },
                { text: 'Angus L. Macdonald Bridge', isCorrect: true },
                { text: 'Canso Causeway', isCorrect: false },
                { text: 'LaHave Cable Ferry', isCorrect: false }
            ],
            fact: 'The Angus L. Macdonald Bridge, also known as "The Old Bridge," is one of two suspension bridges spanning Halifax Harbour, connecting the cities of Halifax and Dartmouth.'
        },
        {
            type: 'multipleChoice',
            text: 'What is the main rail service provider in Nova Scotia?',
            options: [
                { text: 'CN Rail', isCorrect: false },
                { text: 'VIA Rail', isCorrect: true },
                { text: 'CP Rail', isCorrect: false },
                { text: 'GO Transit', isCorrect: false }
            ],
            fact: 'VIA Rail operates passenger rail services in Nova Scotia, including the Ocean, which runs between Halifax and Montreal.'
        },
        {
            type: 'multipleChoice',
            text: 'Which port is the busiest in Nova Scotia?',
            options: [
                { text: 'Port of Sydney', isCorrect: false },
                { text: 'Port of Halifax', isCorrect: true },
                { text: 'Port of Digby', isCorrect: false },
                { text: 'Port of Yarmouth', isCorrect: false }
            ],
            fact: 'The Port of Halifax is one of Canada\'s largest and busiest ports, handling a significant volume of container and cargo traffic.'
        },
        {
            type: 'multipleChoice',
            text: 'What type of transportation is popular in Halifax for short distances?',
            options: [
                { text: 'Bicycles', isCorrect: false },
                { text: 'Ferries', isCorrect: true },
                { text: 'Trams', isCorrect: false },
                { text: 'Taxis', isCorrect: false }
            ],
            fact: 'The Halifax-Dartmouth ferry service is a popular and scenic mode of transportation for commuters and tourists, providing quick access across Halifax Harbour.'
        },
        {
            type: 'multipleChoice',
            text: 'Which tunnel connects Halifax to its airport?',
            options: [
                { text: 'Bedford Highway Tunnel', isCorrect: false },
                { text: 'Angus L. Macdonald Tunnel', isCorrect: false },
                { text: 'Windsor Street Exchange Tunnel', isCorrect: false },
                { text: 'A. Murray MacKay Bridge Tunnel', isCorrect: true }
            ],
            fact: 'The A. Murray MacKay Bridge Tunnel, commonly referred to as the MacKay Bridge, provides a key connection between Halifax and its airport.'
        },
        {
            type: 'multipleChoice',
            text: 'What major infrastructure project improved access to Cape Breton Island?',
            options: [
                { text: 'Confederation Bridge', isCorrect: false },
                { text: 'Canso Causeway', isCorrect: true },
                { text: 'Sydney Harbour Bridge', isCorrect: false },
                { text: 'Strait of Canso Tunnels', isCorrect: false }
            ],
            fact: 'The Canso Causeway, completed in 1955, connects Cape Breton Island to mainland Nova Scotia, facilitating road and rail transportation.'
        },
        {
            type: 'multipleChoice',
            text: 'What is the primary public transportation provider in Halifax?',
            options: [
                { text: 'Halifax Metro Transit', isCorrect: true },
                { text: 'Halifax Regional Express', isCorrect: false },
                { text: 'Halifax City Buses', isCorrect: false },
                { text: 'Halifax Transit Authority', isCorrect: false }
            ],
            fact: 'Halifax Metro Transit, known as Halifax Transit, operates bus and ferry services throughout the Halifax Regional Municipality, providing comprehensive public transportation options.'
        }
    ],
    5: [
        {
            type: 'multipleChoice',
            text: 'Who is the current Premier of Nova Scotia? (As of 2023)',
            options: [
                { text: 'Stephen McNeil', isCorrect: false },
                { text: 'Tim Houston', isCorrect: true },
                { text: 'Iain Rankin', isCorrect: false },
                { text: 'Darrell Dexter', isCorrect: false }
            ],
            fact: 'Tim Houston became the Premier of Nova Scotia in 2021, leading the Progressive Conservative Party to victory in the provincial election.'
        },
        {
            type: 'multipleChoice',
            text: 'How many seats are there in the Nova Scotia House of Assembly?',
            options: [
                { text: '45', isCorrect: false },
                { text: '51', isCorrect: true },
                { text: '55', isCorrect: false },
                { text: '60', isCorrect: false }
            ],
            fact: 'The Nova Scotia House of Assembly is comprised of 51 elected members, representing constituencies across the province.'
        },
        {
            type: 'multipleChoice',
            text: 'Which party is currently in power in Nova Scotia?',
            options: [
                { text: 'Liberal Party', isCorrect: false },
                { text: 'Progressive Conservative Party', isCorrect: true },
                { text: 'New Democratic Party', isCorrect: false },
                { text: 'Green Party', isCorrect: false }
            ],
            fact: 'The Progressive Conservative Party is currently the governing party in Nova Scotia, having won the most recent provincial election.'
        },
        {
            type: 'multipleChoice',
            text: 'Who was the first female Premier of Nova Scotia?',
            options: [
                { text: 'Alexa McDonough', isCorrect: false },
                { text: 'Mary Clancy', isCorrect: false },
                { text: 'Lorraine Michael', isCorrect: false },
                { text: 'None', isCorrect: true }
            ],
            fact: 'Nova Scotia has not yet had a female Premier, highlighting the ongoing journey towards gender equality in political leadership.'
        },
        {
            type: 'multipleChoice',
            text: 'What is the official residence of the Lieutenant Governor of Nova Scotia?',
            options: [
                { text: 'Government House', isCorrect: true },
                { text: 'Province House', isCorrect: false },
                { text: 'Citadel Hill', isCorrect: false },
                { text: 'Alderney Landing', isCorrect: false }
            ],
            fact: 'Government House, located in Halifax, is the official residence of the Lieutenant Governor of Nova Scotia and one of the oldest official residences in Canada.'
        },
        {
            type: 'multipleChoice',
            text: 'How often are provincial elections held in Nova Scotia?',
            options: [
                { text: 'Every 3 years', isCorrect: false },
                { text: 'Every 4 years', isCorrect: true },
                { text: 'Every 5 years', isCorrect: false },
                { text: 'Every 6 years', isCorrect: false }
            ],
            fact: 'Provincial elections in Nova Scotia are held every four years, although the Premier can call an election at any time within that period.'
        },
        {
            type: 'multipleChoice',
            text: 'Which building houses the Nova Scotia legislature?',
            options: [
                { text: 'Government House', isCorrect: false },
                { text: 'Province House', isCorrect: true },
                { text: 'Halifax City Hall', isCorrect: false },
                { text: 'Dalhousie University', isCorrect: false }
            ],
            fact: 'Province House in Halifax is the seat of the Nova Scotia legislature and is the oldest legislative building in Canada, in use since 1819.'
        },
        {
            type: 'multipleChoice',
            text: 'Who represents the British monarch in Nova Scotia?',
            options: [
                { text: 'The Premier', isCorrect: false },
                { text: 'The Lieutenant Governor', isCorrect: true },
                { text: 'The Speaker of the House', isCorrect: false },
                { text: 'The Prime Minister', isCorrect: false }
            ],
            fact: 'The Lieutenant Governor acts as the representative of the British monarch in Nova Scotia, performing ceremonial duties and granting royal assent to legislation.'
        },
        {
            type: 'multipleChoice',
            text: 'What is the role of the Speaker of the House in Nova Scotia?',
            options: [
                { text: 'Leader of the opposition', isCorrect: false },
                { text: 'Head of the government', isCorrect: false },
                { text: 'Presiding officer of the House of Assembly', isCorrect: true },
                { text: 'Chair of the finance committee', isCorrect: false }
            ],
            fact: 'The Speaker of the House in Nova Scotia is responsible for maintaining order during debates and ensuring the rules of the House are followed.'
        },
        {
            type: 'multipleChoice',
            text: 'Which level of government is responsible for education in Nova Scotia?',
            options: [
                { text: 'Municipal government', isCorrect: false },
                { text: 'Provincial government', isCorrect: true },
                { text: 'Federal government', isCorrect: false },
                { text: 'Regional government', isCorrect: false }
            ],
            fact: 'The provincial government of Nova Scotia is responsible for the administration and funding of education within the province.'
        }
    ],
    6: [
        {
            type: 'multipleChoice',
            text: 'What is the most valuable fishery in Nova Scotia?',
            options: [
                { text: 'Lobster', isCorrect: true },
                { text: 'Cod', isCorrect: false },
                { text: 'Herring', isCorrect: false },
                { text: 'Mackerel', isCorrect: false }
            ],
            fact: 'Lobster is the most valuable fishery in Nova Scotia, contributing significantly to the province\'s economy through both local sales and exports.'
        },
        {
            type: 'multipleChoice',
            text: 'Which whale species is commonly seen off the coast of Nova Scotia?',
            options: [
                { text: 'Blue Whale', isCorrect: false },
                { text: 'Humpback Whale', isCorrect: true },
                { text: 'Orca', isCorrect: false },
                { text: 'Gray Whale', isCorrect: false }
            ],
            fact: 'Humpback Whales are frequently spotted off the coast of Nova Scotia, known for their acrobatic breaches and melodic songs.'
        },
        {
            type: 'multipleChoice',
            text: 'What is the main type of aquaculture in Nova Scotia?',
            options: [
                { text: 'Salmon farming', isCorrect: true },
                { text: 'Oyster farming', isCorrect: false },
                { text: 'Shrimp farming', isCorrect: false },
                { text: 'Seaweed farming', isCorrect: false }
            ],
            fact: 'Salmon farming is a major industry in Nova Scotia\'s aquaculture sector, with farms located in the province\'s coastal waters.'
        },
        {
            type: 'multipleChoice',
            text: 'Which marine mammal is a common sight in Nova Scotia\'s waters?',
            options: [
                { text: 'Dolphin', isCorrect: false },
                { text: 'Seal', isCorrect: true },
                { text: 'Manatee', isCorrect: false },
                { text: 'Narwhal', isCorrect: false }
            ],
            fact: 'Seals are a common sight in Nova Scotia\'s waters, with both harbor seals and gray seals inhabiting the region\'s coastline and islands.'
        },
        {
            type: 'multipleChoice',
            text: 'What species is targeted by the Nova Scotia scallop fishery?',
            options: [
                { text: 'Sea Scallop', isCorrect: true },
                { text: 'Bay Scallop', isCorrect: false },
                { text: 'Calico Scallop', isCorrect: false },
                { text: 'Queen Scallop', isCorrect: false }
            ],
            fact: 'The sea scallop fishery is an important industry in Nova Scotia, with the province being one of the largest producers of sea scallops in Canada.'
        },
        {
            type: 'multipleChoice',
            text: 'Which fish is known for its annual migration to Nova Scotia’s rivers to spawn?',
            options: [
                { text: 'Atlantic Salmon', isCorrect: true },
                { text: 'Swordfish', isCorrect: false },
                { text: 'Tuna', isCorrect: false },
                { text: 'Halibut', isCorrect: false }
            ],
            fact: 'Atlantic Salmon are known for their challenging migration from the ocean to freshwater rivers in Nova Scotia, where they spawn before returning to the sea.'
        },
        {
            type: 'multipleChoice',
            text: 'What type of crab is commercially harvested in Nova Scotia?',
            options: [
                { text: 'Blue Crab', isCorrect: false },
                { text: 'Snow Crab', isCorrect: true },
                { text: 'Dungeness Crab', isCorrect: false },
                { text: 'King Crab', isCorrect: false }
            ],
            fact: 'Snow Crab is commercially harvested in Nova Scotia, with its sweet, delicate meat being highly prized in both local and international markets.'
        },
        {
            type: 'multipleChoice',
            text: 'What marine conservation area is located off the coast of Nova Scotia?',
            options: [
                { text: 'Gulf of St. Lawrence', isCorrect: false },
                { text: 'Sable Island', isCorrect: true },
                { text: 'Bay of Fundy', isCorrect: false },
                { text: 'Hudson Bay', isCorrect: false }
            ],
            fact: 'Sable Island, known for its wild horses and unique ecosystems, was designated as a National Park Reserve to protect its diverse marine and terrestrial environments.'
        },
        {
            type: 'multipleChoice',
            text: 'Which fishery is known for the use of traditional weir fishing methods in Nova Scotia?',
            options: [
                { text: 'Lobster', isCorrect: false },
                { text: 'Herring', isCorrect: true },
                { text: 'Cod', isCorrect: false },
                { text: 'Scallop', isCorrect: false }
            ],
            fact: 'The herring fishery in Nova Scotia often uses traditional weir fishing methods, where fish are trapped in a stationary net structure as they migrate along the coast.'
        },
        {
            type: 'multipleChoice',
            text: 'What is a significant threat to Nova Scotia\'s marine ecosystems?',
            options: [
                { text: 'Overfishing', isCorrect: true },
                { text: 'Desertification', isCorrect: false },
                { text: 'Deforestation', isCorrect: false },
                { text: 'Urbanization', isCorrect: false }
            ],
            fact: 'Overfishing poses a significant threat to Nova Scotia\'s marine ecosystems, leading to efforts to implement sustainable fishing practices and conservation measures.'
        }
    ],
    
    
    
    
    7: [
        {
            text: 'Match the item:',
            items: [
                { text: 'Lobster Roll', image: require('./assets/Lobster_Roll.jpg') },
                { text: 'Digby Scallops', image: require('./assets/Digby_Scallops.jpg') },
                { text: 'Blueberry Grunt', image: require('./assets/Blueberry_Grunt.jpg') },
                { text: 'Nova Scotia Lox (Smoked Salmon)', image: require('./assets/Nova_Scotia_Lox_(Smoked_Salmon).jpg') },
                { text: 'Hodge Podge', image: require('./assets/Hodge_Podge.jpg') },
                { text: 'Solomon Gundy (Pickled Herring)', image: require('./assets/Solomon_Gundy_(Pickled_Herring).jpg') },
                { text: 'Annapolis Valley Apple Cider', image: require('./assets/Annapolis_Valley_Apple_Cider.jpg') },
                { text: 'Fish and Chips', image: require('./assets/Fish_and_Chips.jpg') },
                { text: 'Rappie Pie', image: require('./assets/Rappie_Pie.jpg') },
                { text: 'Seafood Chowder', image: require('./assets/Seafood_Chowder.jpg') },
            ],
        },
    ],
    8: [
        {
            text: 'Match the item:',
            items: [
                { text: 'Mi\'kmaq Traditional Clothing', image: require('./assets/Mi\'kmaq_Traditional_Clothing.jpg') },
                { text: 'Mi\'kmaq Wigwam', image: require('./assets/Mi\'kmaq_Wigwam.jpg') },
                { text: 'Mi\'kmaq Petroglyphs', image: require('./assets/Mi\'kmaq_Petroglyphs.jpg') },
                { text: 'Mi\'kmaq Drumming', image: require('./assets/Mi\'kmaq_Drumming.jpg') },
                { text: 'Mi\'kmaq Basket Weaving', image: require('./assets/Mi\'kmaq_Basket_Weaving.jpg') },
                { text: 'Mi\'kmaq Quillwork', image: require('./assets/Mi\'kmaq_Quillwork.jpg') },
                { text: 'Mi\'kmaq Powwow', image: require('./assets/Mi\'kmaq_Powwow.jpg') },
                { text: 'Mi\'kmaq Canoe', image: require('./assets/Mi\'kmaq_Canoe.jpg') },
                { text: 'Mi\'kmaq Smudge Ceremony', image: require('./assets/Mi\'kmaq_Smudge_Ceremony.jpg') },
                { text: 'Mi\'kmaq Legends Storytelling', image: require('./assets/Mi\'kmaq_Legends_Storytelling.jpg') },
            ],
        },
    ],
    9: [
        {
            text: 'Match the item:',
            items: [
                { text: 'Maud Lewis Painting', image: require('./assets/Maud_Lewis_Painting.jpg') },
                { text: 'Pier 21 Museum', image: require('./assets/Pier_21_Museum.jpg') },
                { text: 'Halifax Central Library', image: require('./assets/Halifax_Central_Library.jpg') },
                { text: 'Alexander Keith\'s Brewery (Historical Literature)', image: require('./assets/Alexander_Keith\'s_Brewery_(Historical_Literature).jpg') },
                { text: 'Art Gallery of Nova Scotia', image: require('./assets/Art_Gallery_of_Nova_Scotia.jpg') },
                { text: 'Symphony Nova Scotia', image: require('./assets/Symphony_Nova_Scotia.jpg') },
                { text: 'Lunenburg Academy (Literary History)', image: require('./assets/Lunenburg_Academy_(Literary_History).jpg') },
                { text: 'Shubenacadie Sam (Folklore)', image: require('./assets/Shubenacadie_Sam_(Folklore).jpg') },
                { text: 'The Stan Rogers Folk Festival Poster', image: require('./assets/Stan_Rogers_Folk_Festival.jpg') },
            ],
        },
    ],
    10: [
        {
            text: 'Match the item:',
            items: [
                { text: 'Celtic Colours International Festival', image: require('./assets/Celtic_Colours_International_Festival.jpg') },
                { text: 'East Coast Music Awards', image: require('./assets/East_Coast_Music_Awards.jpg') },
                { text: 'Symphony Nova Scotia', image: require('./assets/Symphony_Nova_Scotia1.jpg') },
                { text: 'The Rankin Family Band', image: require('./assets/Natalie_MacMaster_Fiddle_Performance.png') },
                { text: 'Stan Rogers Folk Festival', image: require('./assets/Stan_Rogers_Folk_Festival.jpg') },
                { text: 'Royal Nova Scotia International Tattoo', image: require('./assets/Royal_Nova_Scotia_International_Tattoo.jpg') },
                { text: 'Rita MacNeil Performance', image: require('./assets/Rita_MacNeil_Performance.jpg') },
                { text: 'Natalie MacMaster Fiddle Performance', image: require('./assets/Natalie_MacMaster_2007.jpg') },
                { text: 'Barra MacNeils Concert', image: require('./assets/Barra_MacNeils_Concert.jpeg') },
                { text: 'Anne Murray Centre', image: require('./assets/Anne_Murray_Centre.jpg') },
            ],
        },
    ],
    
};
const Timer = ({ initialTime, isPaused, onTimeUp, quizFinished }) => {
    const timerRef = useRef(initialTime);
    const [displayTime, setDisplayTime] = useState(initialTime);

    useEffect(() => {
        const interval = setInterval(() => {
            if (isPaused || quizFinished || timerRef.current <= 0) return;

            timerRef.current -= 1;
            setDisplayTime(timerRef.current);

            if (timerRef.current <= 0) {
                clearInterval(interval);
                onTimeUp();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isPaused, onTimeUp, quizFinished]);

    return <Text style={styles.timer}>Time Left: {displayTime}s</Text>;
};
const itemsPerBatch = 5;
const QuizScreen = ({ route, navigation }) => {
    const { topic, quizId } = route.params;
    const [mode, setMode] = useState(null);
    const [score, setScore] = useState(0);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [quizFinished, setQuizFinished] = useState(false);
    const [matchedItems, setMatchedItems] = useState([]);
    const [currentFact, setCurrentFact] = useState('');
    const [isFactModalVisible, setIsFactModalVisible] = useState(false);
    const [availableItems, setAvailableItems] = useState([]);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [isTimerPaused, setIsTimerPaused] = useState(false);
    const [remainingTime, setRemainingTime] = useState(60);
    const [currentItems, setCurrentItems] = useState([]); 
const [currentBatchIndex, setCurrentBatchIndex] = useState(0); 
const { vibrationOn } = useVibration();


    
    const saveEarnedCoins = async () => {
        try {
            const existingCoins = await AsyncStorage.getItem('coins');
            
            
            const adjustedScore = Math.floor(score / 5);
    
           
            const totalCoins = (existingCoins ? parseInt(existingCoins, 10) : 0) + adjustedScore;
            await AsyncStorage.setItem('coins', totalCoins.toString());
        } catch (error) {
            console.error('Error saving earned coins:', error);
        }
    };
      useEffect(() => {
        if (quizFinished) {
          saveEarnedCoins();
        }
      }, [quizFinished]);
      const saveScore = async () => {
        try {
            const storedProgress = await AsyncStorage.getItem('quizProgress');
            const progressData = storedProgress ? JSON.parse(storedProgress) : Array(10).fill({ score: 0, progressPercentage: 0 });
    
            
            if (score > progressData[quizId - 1].score) {
                progressData[quizId - 1] = {
                    score,
                    progressPercentage: (score / (10 * 10)) * 100, 
                };
    
                await AsyncStorage.setItem('quizProgress', JSON.stringify(progressData));
            }
        } catch (error) {
            console.error('Error saving score:', error);
        }
    };

   
    const startQuiz = (selectedMode) => {
        setMode(selectedMode);
        setIsTimerActive(selectedMode === 'timed');
        loadQuestion();
    };

    const onTimeUp = useCallback(() => {
        if (mode === 'timed') {
          setQuizFinished(true);
          saveScore();
         
        }
      }, [mode, score, navigation]);

    useEffect(() => {
        loadQuestion();
    }, [questionIndex]);

    const loadQuestion = () => {
        const currentQuiz = quizzes[quizId];
        
      
        if (!currentQuiz || questionIndex >= currentQuiz.length) {
            setQuizFinished(true);
            saveScore();
            return;
        }
    
      
        if (quizId >= 7) {
            const shuffledItems = shuffleArray(currentQuiz[0].items); 
            setMatchedItems(Array(shuffledItems.length).fill(null)); 
            setAvailableItems(shuffledItems); 
            setCurrentItems(shuffledItems.slice(0, itemsPerBatch)); 
            setCurrentBatchIndex(0); 
            setCurrentQuestion({ ...currentQuiz[0], items: shuffledItems }); 
        } else {
          
            setCurrentQuestion(currentQuiz[questionIndex]);
        }
    };
  const handleAnswer = (isCorrect, fact) => {
        if (vibrationOn) {
            ReactNativeHapticFeedback.trigger(isCorrect ? 'notificationSuccess' : 'notificationError');
        }

        if (isCorrect) {
            setScore((prev) => prev + 10);
            setCurrentFact(fact);
            setIsFactModalVisible(true);
            setIsTimerPaused(true);
        } else if (mode === 'suddenDeath') {
            setQuizFinished(true);
        }
        setQuestionIndex((prev) => prev + 1);
    };
    const handleDrop = (dropIndex, item) => {
        const newMatchedItems = [...matchedItems];
        newMatchedItems[dropIndex + currentBatchIndex * itemsPerBatch] = item;
        setMatchedItems(newMatchedItems);
    
        
        setCurrentItems((prev) => prev.filter((i) => i.text !== item.text));
    
       
        const isBatchComplete = newMatchedItems.slice(
            currentBatchIndex * itemsPerBatch,
            (currentBatchIndex + 1) * itemsPerBatch
        ).every((matchedItem) => matchedItem !== null);
    
        
        if (isBatchComplete && (currentBatchIndex + 1) * itemsPerBatch < currentQuestion.items.length) {
            setTimeout(() => {
                setCurrentBatchIndex((prev) => prev + 1);
                const nextBatch = currentQuestion.items.slice(
                    (currentBatchIndex + 1) * itemsPerBatch,
                    (currentBatchIndex + 2) * itemsPerBatch
                );
                setCurrentItems(nextBatch);
            }, 500);
        }
    };
    const submitAnswer = () => {
        let newScore = score;
    
        
        matchedItems.forEach((item, index) => {
            if (item && item.text === currentQuestion.items[index].text) {
                newScore += 10; 
            }
        });
        
        setScore(newScore); 
        setQuestionIndex((prev) => prev + 1); 
    };

    const handleModalClose = () => {
        setIsFactModalVisible(false);
        setIsTimerPaused(false); 
    };

    const MultipleChoiceQuestion = ({ question, onAnswer }) => (
        
        <View style={styles.questionContainer}>
            
            <Text style={styles.questionText}>{question.text}</Text>
            {question.options.map((option, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.answerButton}
                    onPress={() => onAnswer(option.isCorrect, question.fact)}
                >
                    <Text style={styles.answerButtonText}>{option.text}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
    
    const MatchingQuestion = () => {
        const currentDropZones = currentQuestion.items.slice(
            currentBatchIndex * itemsPerBatch,
            (currentBatchIndex + 1) * itemsPerBatch
        );
    
        return (
            
            <ScrollView style={styles.questionContainer}>
                <Text style={styles.questionText}>{currentQuestion.text}</Text>
                <View style={styles.matchingRowContainer}>
                    <View style={styles.itemsContainer}>
                        {currentItems.map((item, index) => (
                            <View key={index} style={styles.matchingContainer}>
                                <Draggable
                                    renderSize={90}
                                    onDragRelease={() => {
                                        const dropIndex = currentDropZones.findIndex((_, i) => !matchedItems[i + currentBatchIndex * itemsPerBatch]);
                                        if (dropIndex !== -1) handleDrop(dropIndex, item);
                                    }}
                                >
                                    <Image source={item.image} style={styles.image} />
                                </Draggable>
                            </View>
                        ))}
                    </View>
                    <View style={styles.dropZonesContainer}>
                        {currentDropZones.map((item, index) => (
                            <View key={index} style={styles.dropZone}>
                                {matchedItems[index + currentBatchIndex * itemsPerBatch] ? (
                                    <Image source={matchedItems[index + currentBatchIndex * itemsPerBatch].image} style={styles.image} />
                                ) : (
                                    <Text style={styles.dropZoneText}>{item.text}</Text>
                                )}
                            </View>
                        ))}
                    </View>
                </View>
                <TouchableOpacity style={styles.submitButton} onPress={submitAnswer}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>
            
        );
    };
    
    return (
        <ImageBackground source={require('./back.png')} style={styles.backgroundImage}>
        <View style={styles.container}>
           
            <TouchableOpacity style={styles.exitButton} onPress={navigation.goBack}>
                <Text style={styles.exitButtonText}>✖️</Text>
            </TouchableOpacity>
            
          
            <Text style={styles.title}>Topic: {topic}</Text>
    
            
            {!mode ? (
                <View style={styles.modeSelectionContainer}>
                <Text style={styles.modeSelectionText}>Select Mode</Text>
                <TouchableOpacity style={styles.modeButton} onPress={() => startQuiz('timed')}>
                <Image source={require('./timed.png')} style={styles.modeImage} />
                    <Text style={styles.modeButtonText}>Timed Mode</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modeButton} onPress={() => startQuiz('suddenDeath')}>
                <Image source={require('./face.png')} style={styles.modeImage} />
                    <Text style={styles.modeButtonText}>Sudden Death Mode</Text>
                </TouchableOpacity>
            </View>
            ) : (
               
                <>
                    <Text style={styles.score}>Score: {score}</Text>
    
                    {isTimerActive && (
    <Timer initialTime={remainingTime} isPaused={isTimerPaused} onTimeUp={onTimeUp} quizFinished={quizFinished} />
)}
    
    {quizFinished ? (
    <Text style={styles.finishedText}>Quiz Finished! Final Score: {score}</Text>
) : (
    currentQuestion && (
        quizId >= 7
            ? <MatchingQuestion /> 
            : <MultipleChoiceQuestion question={currentQuestion} onAnswer={handleAnswer} />

                        )
                    )}
    
                    <FactModal visible={isFactModalVisible} fact={currentFact} onClose={handleModalClose} />
                </>
            )}
            
        </View>
        </ImageBackground>
    );
}; const FactModal = ({ visible, fact, onClose }) => (
    <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.modalContent}>
            <Text style={styles.factText}>{fact}</Text>
            <TouchableOpacity style={styles.okButton} onPress={onClose}>
                <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
        </View>
    </Modal>
);

const styles = StyleSheet.create({
     backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
    okButton: {
        backgroundColor: '#FFAA00',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    okButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modeImage: {
        width: 50, 
        height: 50, 
        alignSelf:'center',
        resizeMode: 'contain', 

    },
    submitButton: {
        backgroundColor: '#FFAA00',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginVertical: 20,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        elevation: 5,
    },
    submitButtonText: {
        fontSize: 18,
        color: '#333',
        fontWeight: '600',
        textAlign: 'center',
    },
    modeSelectionContainer: {
        flex: 1,
        justifyContent: 'center',
      
       alignContent:'center',
        padding: 20,
       
    },
    modeSelectionText: {
        
        alignSelf:'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFAA00', 
        marginBottom: 20,
    },
    modeButton: {
        backgroundColor: '#FFAA00', 
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modeButtonText: {
        alignSelf:'center',
        fontSize: 18,
        color: '#333', 
        fontWeight: '600',
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    exitButton: {
        alignSelf: 'flex-end',
        backgroundColor: '#FFAA00', 
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
      },
    exitButtonText: {
        fontSize: 24,
        color: '#FFAA00',
        fontWeight: '600',
    },
    title: {
        fontSize: 30,
        fontWeight: '700',
        color: '#FFAA00',
        marginVertical: 20,
        textAlign: 'center',
    },
    score: {
        fontWeight: 'bold',
        fontSize: 22,
        color: '#FFAA00',
        marginBottom: 15,
    },
    finishedText: {
        fontSize: 23,
        fontWeight: 'bold',
        color: '#FFAA00',
        marginTop: 30,
    },
    timer: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#FFAA00',
        marginBottom: 15,
    },
    questionContainer: {
        width: '100%',
        marginBottom: 20,
        backgroundColor: 'rgba(25, 25, 25, 0.7)',

        borderRadius: 10,
        padding: 15,
    },
    questionText: {
        fontSize: 22,
        color: '#FFAA00',
        marginBottom: 15,
    },
    answerButton: {
        backgroundColor: '#FFAA00',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    answerButtonText: {
        fontSize: 18,
        color: '#1C1C1C',
        textAlign: 'center',
    },
    matchingRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    itemsContainer: {
        flex: 1,
        alignItems: 'center',
        marginRight: 10,
    },
    matchingContainer: {
        marginLeft:20,
        alignSelf:'baseline',
        marginBottom: 115,
    },
    dropZonesContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    dropZone: {
        width: '100%',
        height: 120,
        borderWidth: 2, 
        borderColor: '#FFAA00',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10, 
    },
    dropZoneText: {
        fontSize: 18,
        color: '#E0E0E0',
    },
    image: {
        borderRadius:10,
        width: 100,
        height: 100,
        resizeMode: 'cover',
    },
    modalContent: {
       
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(25, 25, 25, 1)',

        padding: 30,
    },
    factText: {
        fontWeight: 'bold',
        color: '#FFAA00',
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 20,
    },
});

export default QuizScreen;
