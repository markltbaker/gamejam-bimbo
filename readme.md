
The $6,000,000 Bimbo Syndicate

Due to medical complicatinons from breast augmentation surgery you've run up a $6,000,000 bill!
Lenny the loan shark has given you 7 days to come up with the cash or he'll give you a stylish pair of concrete boots!!


You start off with:
Variables
  Time Remaining (hours/days)
  Money $

Skills:
  Retail      level 1
  Secretarial level 1
  Persuasion  level 1
  Bartending  level 0
  Legaleze    level 0
  Trading     level 0
  
Inventory:
  Expensive Shoe Collection
  Heat Magazine
  Hairbrush
  Phone


How to get money:

- Work      -- list of jobs, give $ for time (hours)
- Train     -- get skill to unlock better job (takes hours and $)
- Chance    -- Dumpster Diving, Tidy up Apartment, cultivate Sugar Daddy - take up time, CHANCE of $
- Pawn Shop -- Sell/Buy items for $  (prices fluctuate, but buy always > sell)
- Stores    -- Buy items for $ (prices fluctuate)
- Trading   -- Trade with friends - SWAP items / Trade mechanic - propose trade, random chance of acceptance


Doing actions increases skill level

Random selection of options
each option random hours / $ / award / %age

var player = {
    "timeRemaining": 12345, // hours
    "money": 1234, // dollars
    "inventory" : {
        "item": 123,
        "item2": 32
    },
    "skills" : {
        "Retail": 0,     
        "Secretarial": 0,
        "Persuasion": 0, 
        "Bartending": 0, 
        "Legaleze": 0,   
        "Trading": 0
    }
};

var workData = {
    "jobNameAndDescription": {  "time": [5, 10], "money": [100,1000], "skills": {"Retail": 0.5, "Legaleze": 0.5} }
};

 "jobNameAndDescription": {  "time": [5, 10], "money": [100,1000], "skills": {"Retail": 0.5, "Legaleze": 0.5}, "risk": 1.0 }

chance -item awarded, time, money, skills, risk range

pawn shop / stores - items and price range



var actionData = {
    "Work": workData,
    "Train": trainData,
    ...
};

Game loop:
  Choose type of activity
  Get list of choices
  Choose job,
    skills / random factor decides result
    result changes player data

  Loop until (time <= 0) OR (money > 6000000)



https://github.com/mcmarkb/gamejam-bimbo

UI - renders data, renders choices, allows them to be chosen -- MarkB
Action Engine -- Ivar
Aciton Data  -- Al
Trading Logic
Skills Engine

