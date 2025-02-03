import React from 'react';
import SingleFAQ from '../../components/home/SingleFAQ';
import Typography from '../../components/ui/Typography';
import Wrapper from '../../components/Wrapper';
const faq = [
  {
    title: 'The Kosher Status of Meat, Dairy and Fish',
    items: [
      {
        title: 'Can Worcestershire Sauce be used to flavor meat and chicken?',
        body: 'Whether or not Worcestershire sauce can be used as a flavoring for meat or poultry depends upon the percentage of anchovies used in the ingredients. Anchovies are small fish. The halacha does not permit the mixing of meat and fish because of sakana, halachic health concerns. However, if the amount of anchovies are less than 1/60, i.e., less than 1.66% of the Worcestershire ingredients, the fish would be batul b\'shishim, nullified in the sauce, and would not be considered a health concern. (For example, a sauce marked "STAR-K Fish" contains more than 1.66% fish, whereas a sauce with anchovies marked with only an "STAR-K" uses less.)',
      },
      {
        title:
          'I have seen packages of buffalo meat with kosher symbols. Is buffalo meat really kosher?',
        body: 'Yes, STAR-K accepts properly slaughtered buffalo or bison meat as kosher.',
      },
      {
        title: 'Are Guinea Fowl and Quail kosher? We would like to eat the eggs.',
        body: 'The Torah lists 24 species of non-kosher fowl. All others are permitted. However, over the years uncertainty has arisen over the identification of these birds. Therefore, Jews consider a fowl kosher only if there is a tradition that this species has always been considered kosher (as with chicken). There is no such tradition regarding Guinea Fowl and Quail, and therefore, they are not considered kosher. Click here for a further discussion on kosher birds.',
      },
      {
        title:
          'I run a kosher kitchen at a senior center. We have no problem with the separation of milk and meat, that for us is obvious, but it starts getting fuzzy around the "Pareve" issue. Because we have no utensils that are designated pareve, all our pareve recipes are prepared on either meat equipment or dairy equipment. My question is this: Is something that is prepared on meat equipment, permitted with a dairy meal, since the ingredients are strictly pareve?',
        body: 'Initially one may not cook parve food in a dairy pot in order to eat with meat (or vice versa). However, if not done intentionally to eat with meat, and the pot had not been used for 24 hours, the food may then be eaten with meat. (The parve food should be served with disposable utensils.) One may cook parve food in a dairy pot (even if the pot had been used used within 24 hours) in order to eat the parve food after meat.',
      },
      {
        title: "If animals and birds need to be slaughtered, why don't fish?",
        body: 'n Numbers 11:22 it states, "If sheep and cattle be slaughtered for them, will there be enough? If all the fish of the sea will be gathered for them, will there be enough?" From this quote we can understand that sheep and cattle require slaughtering, however, fish require only "gathering" and do not need to be slaughtered. They may be killed in any fashion. The reason for this is given in the Talmud (Chulin 27b).Animals and birds are considered a higher level of creation than fish.',
      },
      {
        title:
          'When something is marked with a "DE", does that mean it can only be used with a dairy meal, on dairy dishes? Can something marked "DE" be used with meat flatware?',
        body: 'A reliably certified product marked DE can be eaten after, but not with meat. If served at a meat meal, it should be eaten with disposable utensils.',
      },
      {
        title: 'What does the STAR-K hechsher on tuna mean?',
        body: 'STAR-K tuna is always Bishul Yisroel, and the mashgiach checks that every fish is kosher by checking for scales. All additives and utensils used are kosher.',
      },
      {
        title: 'Why is eating fish and meat together prohibited?',
        body: 'The Talmud states that one who consumes fish and meat together is at risk for the disease "tzara\'as", and therefore this combination is prohibited..',
      },
      {
        title:
          'Your website indicates that the use of "pareve" regarding a food product means that the product contains no meat or dairy ingredients. Does this mean vegans and vegetarians can eat pareve foods without any concern?',
        body: 'Fish and eggs are pareve, since they are neither meat nor dairy, although they are not considered vegan. As far as vegetarians are concerned, there are different levels of adherence and varied opinions as to what vegetarians will accept. We are aware of many vegetarians who seek out pareve foods and feel that pareve satisfies their needs. However, we cannot say definitively that all pareve foods are suitable for all vegetarians. If you have a question about a specific product, feel free to contact us.',
      },
      {
        title:
          'What are the cheeses that are considered "hard cheeses" for which one has to wait six hours before eating meat? Are cottage and cream cheese considered hard cheeses? What if the hard cheese is cooked?',
        body: 'Hard cheese is cheese that has been aged so that it no longer can be sliced. Parmesian cheese is considered hard if it has been aged for six months. Romano may also be a hard cheese (but is not readily available as kosher). Swiss, Cheddar, Muenster, and Mozzarella are not hard cheeses. Cottage and cream cheese are certainly not hard cheeses either. If a hard cheese is cooked, it does not lose its status as a hard cheese.',
      },
      {
        title: 'Someone told me that gelatin can come from horses hooves. Is that true?',
        body: 'Yes, it is possible that gelatin may come from horses hooves. Gelatin is a natural product that can be extracted from bones, hides, or hooves. The more common source would be animal hides. A reliable kosher certification ensures that the gelatin comes only from kosher animals.',
      },
      {
        title:
          'Do canned tuna and canned salmon need to be bishul Yisroel? Are these products, when certified by STAR-K, bishul Yisroel?',
        body: 'We recommend mashgiach temidi/bishul Yisroel for tuna and salmon. When certified by STAR-K, they are always mashgiach temidi/bishul Yisroel.',
      },
      {
        title: 'What is the status of herring that does not have any kosher certification?',
        body: 'Since the herring has no visible scales after processing, it requires kosher certification. Also, the processing of the herring may render it non-kosher as well.',
      },
      {
        title: 'Why is swordfish not kosher?',
        body: 'The adult swordfish has no scales. Even the scales of a young swordfish are not true scales. A fish is only kosher if it has scales that can be removed from the skin. The scales of swordfish cannot be removed without destroying the skin. Therefore swordfish is not kosher.',
      },
      {
        title: 'Why is eel not kosher?',
        body: "The scales on eels are not like fish scales which are removable. They are part of the eel's skin and therefore eels are not kosher.",
      },
      {
        title: 'Is catfish or sturgeon considered kosher by some Jewish authorities?',
        body: 'In Leviticus 11:12 the Torah states that a kosher fish has fins and scales. The fish you mention have no scales and are not kosher.',
      },
      {
        title: 'What exactly is the difference between STAR-K and Star-D?',
        body: 'The STAR-K symbol on dairy products is cholov yisroel. These products are certified by STAR-K Certification, Inc. whose Rabbinic Administrator is Rabbi Moshe Heinemann. Star-D is the registered trademark of the National Council of Young Israel. All Star-D establishments and products are administered by STAR-K personnel. All standards of STAR-K are employed in Star-D certifications except for the fact that Star-D products are cholov stam - not cholov yisroel.',
      },
      {
        title:
          'I understand that fat is prohibited to eat (Leviticus 7:23). Does this apply to all fat of all animals?',
        body: 'No, it only applies to certain parts of the fat of farm animals (e.g. sheep, cow, goat), but not to non-farm animals (e.g. deer). This fat is removed by kosher butchers in the process of preparing meat for sale. The remaining fat on meat that has been properly prepared is permitted. The forbidden fat is called "chelev". When animal sacrifices were brought to the Temple, the Torah required that the "chelev" of the sacrifices be brought to the altar.',
      },
      {
        title: 'Can one use the same knife sharpener for meat and dairy knives?',
        body: 'If the sharpener gets hot (more than 120F) during sharpening, one should use separate sharpeners. If the sharpener does not get hot, then one can use the same one for meat and dairy. The knife should be washed in cool water before and after sharpening and the sharpener should be rinsed in cool water after use.',
      },
      {
        title:
          'Can one use a non-stick Teflon indoor grill for preparation of both milk and meat dishes?',
        body: 'No. Even though the grill is "non-stick Teflon", one may not use the same one for milk and meat.',
      },
      {
        title: 'Why is kosher food prepared in two kitchens?',
        body: 'Kosher requirements specify that dairy and meat foods may not be mixed. Therefore, a kosher kitchen must have separate facilities for meat and dairy. When dealing with large quantities of foods (such as in a hotel), separate kitchens are required.',
      },
      {
        title:
          'What is the blessing that is said before slaughtering an animal? Is it said over each animal that is slaughtered?',
        body: 'The text of the blessing is, "Blessed are you....who has sanctified us through Your commandments and has commanded us in regards to kosher ritual slaughter." It is said once prior to the starting of the kosher slaughtering process and it covers the entire day\'s production.',
      },
      {
        title:
          'What does the designation of DE after the kosher symbol mean? Can the item be eaten as dessert for a meat meal? If not, does one need to wait six hours after a meat meal to eat the item?',
        body: 'The STAR-K does not use the DE designation, but those agencies that do are putting the designation on foods that have no dairy but have been produced on dairy equipment. DE products can be eaten as a dessert after meat, but not together with meat.You do not need to wait six hours.',
      },
    ],
  },
  {
    title: 'Insects and Bug Issues',
    items: [
      {
        title:
          'Am I permitted to eat the pre-cut lettuce/salads which STAR-K certifies without further washing/examination for bugs? In other words, can I just eat it directly out of the bag?',
        body: 'If the salad bag has a reliable kosher certification on the package, then the salad may be eaten directly from the bag. Please note that the kosher symbol is usually included in the date code stamped on the bag. At times the kosher symbol is left off due to insect infestation of the salad.',
      },
      {
        title: 'Do raw vegetables require kosher certification?',
        body: "1-they do not have insects (see vegetable checking list) ; and 2-they are grown outside of Israel. Israeli grown produce needs special supervision due to its holy status and tithing requirements. (See Terumos and Ma'asros article.)",
      },
      {
        title: 'Are locusts kosher?',
        body: 'The Torah states that certain types of grasshoppers are kosher. However, we no longer have the ability to identify which type is kosher. Therefore, we refrain from eating all grasshoppers.',
      },
      {
        title: 'Do I have to check raw grains for insects?',
        body: 'Currently (6/06), STAR-K policy is that one need not check for insects in raw grains, provided the grains are produced in the USA and marketed by a national company. These are high quality grains, and the turnover should be sufficient to reduce the risk of infestation.',
      },
      {
        title: 'How do I to check fresh broccoli for bugs. What about the broccoli slaws?',
        body: 'Please see here http://www.star-k.org/cons-appr-vegetables.htm for our vegetable checking list. Broccoli slaw that is only broccoli stem pieces does not require checking.',
      },
      {
        title: 'Are alfalfa sprouts and artichokes free of bugs or do they require checking?',
        body: 'Alfalfa sprouts are generally bug-free and need no checking. Artichokes are very often infested and the insects are quite difficult to see. The only way to eat them would be to pull off each raw leaf and wash it while rubbing vigorously under a stream of water to remove any insects. Click here for further vegetable checking information.',
      },
    ],
  },
  {
    title: 'Kashering, Kitchen and Kitchen Mix Ups',
    items: [
      {
        title: 'Can one drain food in a non-kosher clean sink?',
        body: 'Yes. The food should not touch the sink. (However, on Pesach one should not drain hot food into a Chometz sink.)',
      },
      {
        title:
          "I would be grateful if you could clarify a common kashrut error. If one were to accidentally use a dairy spoon in a meat soup or vice versa, how do you kasher the spoon? I've been taught that you stick it in soil for a while, after which it's given a good wash and can then be used again.",
        body: 'Sticking utensils in soil is generally not an effective way of kashering. (There is only one case where it is effective and so that is why some think that this method works.) For a complete understanding of how to kasher,see our online article for the proper method, http://www.star-k.org/cons-keep-basics-home.htm',
      },
      {
        title: 'Is it possible to kasher a china plate?',
        body: 'As a practical matter, we do not kasher china if it has become non-kosher. It is best to check with us or your local Rabbi as it may not actually have become non-kosher.',
      },
      {
        title:
          'I noticed that several companies sell vapor steam cleaning machines that shoot steam out at 212 degrees under high pressure. Would this be a valid method of kashering countertops, tabletops, and sinks that are made of kasherable material?',
        body: 'One may not kasher with steam. If there is a setting on the machine which allows water to shoot out with the steam, this could be used for kashering those countertops which are kasherable. Otherwise, you can pour water on the countertop and use the steam wand to bring the water to a boil.',
      },
      {
        title: 'Are there any electric griddles that can be koshered?',
        body: 'Electric griddles used in the home generally cannot be kashered because a direct flame is required for kashering which would ruin the griddle. If you have a particular question about a griddle which may have become treif, please call the STAR-K hotline.',
      },
      {
        title:
          'If I received shot glasses (for wine, brandy, etc.) from my grandmother who did not keep kosher, may I kasher them?',
        body: 'You may kasher them by waiting 24 hours from their last use, then taking the clean glasses and completely immersing them in a bowl of water for 24 hours. Spill out the water and refill for a total of three-24 hour periods.',
      },
      {
        title:
          'If you accidentally use the wrong sponge (meat vs. dairy), should you immediately throw it out?',
        body: 'Any time you have residue (milchig residue on a fleishig sponge or vice versa) you should throw out the sponge.',
      },
      {
        title: 'I cooked using red wine vinegar without certification. Is this a problem?',
        body: 'Unless the vinegar has reliable certification, it is non-kosher. The utensils used in cooking with this vinegar must be kashered.',
      },
      {
        title:
          'I just purchased a home which has countertops made of Corian which I heard can be kashered through sanding. Is this so?',
        body: 'Because the non-kosher hot food penetrates only a thin layer of the counter, it can be sanded down to take off a layer of Corian and it would be considered kosher. However, we suggest speaking with a kitchen contractor to see if such a project is feasible.',
      },
      {
        title: 'Should a pottery cookie jar be toiveled?',
        body: 'If the pottery is glazed, it should be toiveled without a bracha. If it is not glazed, then no tevilah is needed.',
      },
      {
        title: 'Can a wooden cutting board be kashered?',
        body: 'A wooden cutting board may be kashered if the board is smooth, without cracks and crevices. If it has cracks and crevices, it can be sanded until it is smooth and then kashered.',
      },
      {
        title:
          'Is one permitted to use Bone China? I have heard that it might come from animal bones.',
        body: 'It is possible that bone ash may have been processed to give the china a white color and strength. However, the processing of the bone ash will remove from it any non-kosher status. Therefore, the Bone China may be used without any hesitation.',
      },
    ],
  },
  {
    title: 'Beverages, Liquors and Wine',
    items: [
      {
        title: 'Does rice wine require certification?',
        body: 'Rice Wine (Sake) requires a hechsher because ethyl alcohol is commonly used as an additive in Sake.',
      },
      {
        title: 'Can you buy black coffee from a vending machine?',
        body: 'In a perfect world the machine would only vend black coffee and there would be no kosher concerns. In the real world however, things are not so simple. Most machines vend several types of coffee, tea, hot chocolate, and even soup. In the older machines where many items were served through the same nozzle it was fairly clear that you could not purchase coffee from such a machine. The modern machines however are computer controlled and are very advanced. One of the big improvements is that each item has its own tubes and serving nozzles. Unfortunately, though, unless you know that this particular type of machine has separate mechanisms throughout, you cannot be certain that the items are not mixing or being dispensed from the same nozzle as a non-kosher item. Therefore, it is not recommended that you purchase any beverage from a hot drink machine without intimate knowledge of how the machine operates.',
      },
      {
        title: 'Do flavored seltzers require certification?',
        body: 'Flavored seltzers are very similar to soft drinks, less complicated but at times very deceptive. Sometimes a flavored seltzer will be a plain seltzer with flavor added. At times, the seltzers will not only be flavored it will be sweetened as well and will be more kindred to a soda than a seltzer in taste and complexity. In both instances the formulations need a certification.',
      },
      {
        title:
          'Do those brands of kosher grape juice which do not state mevushal, but only "pasteurized" on the label, have the halachic status of mevushal?',
        body: 'If the grape juice is pasteurized at least at 165 degrees Fahrenheit, then STAR-K would accept it in our facilities as mevushal.',
      },
      {
        title: "Can't someone tell if a product is kosher by looking at the ingredients?",
        body: 'Not necessarily. For example, if the product says vinegar, it could be a non-kosher wine vinegar or kosher vinegar. Or,even if the ingredients are kosher, the item may be made on the same equipment used to process pork and beans, for example. There are, however, products where we are familiar with the processing and the ingredient panel is useful. Call our hotline at 410-484-4110 to determine the kosher status of specific products.',
      },
    ],
  },
  {
    title: 'The Kosher Traveler',
    items: [
      {
        title:
          'I have been asked about halachic issues regarding Kashrut and Shabbat by someone going on a cruise with very few religious Jews. They are ordering pre-prepared Kosher food. Would you please direct me to articles or books which could be helpful in guiding the traveler as what to do.',
        body: 'For a full discussion about cruises, see our article on cruises located here.',
      },
      {
        title:
          'I am a frequent global traveler and a kosher vegetarian. Ordering Kosher food inevitably means that I can eat next to nothing, especially when the non-meat dish is still frozen. I am tempted to order vegetarian airline meals, based on the assumption that caterers work out of facilities large enough that vegetables would be cooked apart from the meat area. Based on your knowledge of the airline catering industry, can you confirm this?',
        body: 'As you indicate, the most obvious concern is the equipment that may have produced non-kosher food. Nonetheless, you are raising a good question - let us say if theoretically an airline purchases food from a strictly vegetarian caterer, is there a problem? This question is quite relevant in the following case - May one go out to eat in a vegetarian restaurant? The main concerns in the above cases are as follows:\
        <ol type="1">\
            <li> Bishul Akum - If an aino-yehudi cooks food that is inedible raw and fit for a banquet, the food is not kosher. Therefore, although the vegetarian meal contains no meat, it may still be non-kosher because of bishul akum - if it is a food fit for a banquet. This would include certain cooked vegetables or other items. Bishul Akum renders the utensils non-kosher. Therefore, even if your meal does not have a concern of Bishul Akum, it is possibly cooked on non-kosher utensils.</li>\
            <li> Non-kosher vegetarian ingredients - Cheese and wine and their derivatives must be produced under special conditions to be kosher. Vegetarian products may contain these ingredients in non-kosher form. In addition, vegetarian products may contain other ingredients that require certification. Even if one ascertains that the products do not contain these ingredients, it is very likely that these ingredients were used on the same equipment on which the food was prepared. Although we could possibly assume that a vegetarian caterer produces without meat, we cannot assume all the ingredients are kosher. Therefore, if one\'s meal were produced on this equipment it would become non-kosher.</li>\
            <li> Tolaim - The leafy vegetables would need to be checked for commonly found insects insects (aphids and thrips). Kosher establishments check while uncertified establishments do not.</li>\
            <li> Fruits and vegetables from Israel need to be tithed. (Link to our article)</li>\
            <li> Fish is eaten by some vegetarians, and only certain fish are kosher. Even if you don’t eat fish, the utensils used for cooking possibly have been used for non-kosher fish. In short, as indicated above, one may not eat a vegetarian meal without proper kosher certification.</li>\
            </ol>',
      },
    ],
  },
  {
    title: 'The Kosher Status of Medication, Vitamins and Nutritional Supplements',
    items: [
      {
        title:
          'Do protein supplements need certification or can I just read the ingredients and see if they are kosher?',
        body: 'Protein supplements are recommended only when they have reliable certification.',
      },
      {
        title:
          'Does whey protein require a certification?Whey protein requires reliable kosher certification.',
        body: 'Whey protein requires reliable kosher certification.',
      },
    ],
  },
  {
    title: 'Oven Use for Everyday, Shabbos and Yom Tov',
    items: [
      {
        title:
          'Am I allowed to use a crockpot or slow cooker to cook my chulent for Shabbos lunch?',
        body: 'Yes, you may use a crockpot or slow cooker for Shabbos food. Put the food in early enough so that when Shabbos starts it will be at least half cooked. You should cover the control knob so that it will not be adjusted on Shabbos. It is also preferred to line the metal pot with foil as one would a blech.',
      },
      {
        title: 'Is it acceptable to cook uncovered meat immediately after cooking fish in an oven?',
        body: 'If there is no visible fish or fish sauce residue in the oven, you may cook uncovered meat immediately after cooking fish.',
      },
      {
        title:
          'Thank you for your "Shabbos Mode" appliances online. In your pre-purchase advice for gas cooktops you mention a problem initiating a flame on Yom Tov. Is there a way to initiate a flame with these cooktops on Yom Tov?',
        body: 'Some cooktops are ignited when you turn the knob to the highest setting to set off the electric spark. You can turn on the gas to a lower setting and hold a pre-existing flame to the burner to ignite. Other models click as you begin to turn the knob. Some claim that if the knob is turned quickly, it will not set off the sparking mechanism which would allow you to ignite the burner from a pre-existing flame. We suggest trying this out before purchasing to see if such a thing is possible.',
      },
      {
        title: 'Do you have to put a blech on an electric range top on Shabbos?',
        body: 'Gas and electric coil rangetops must be covered with a blech in order to leave food on them over Shabbos. In addition, the control knobs should be covered so that you do not inadvertently adjust the dial. If the rangetop has the element built into a corean or glass top, you risk cracking the top by using a blech, and it would be sufficient to cover the control knobs.',
      },
      {
        title: 'Can I take dry food out of my fridge and put it on top of the blech on Shabbos?',
        body: 'No, unless the food would never get hot (120° F) in the spot you placed it, even if you would leave it there all day. However, you can take solid dry food that is completely cooked (such as kugel), and put it on top of another pot of food (such as a chulent pot) that is on the blech, even if the dry food will get hot.',
      },
      {
        title: 'Could you explain the rules for using a hot plate on Shabbos?',
        body: 'One may leave pre-cooked food on a hot plate from before Shabbos. Any temperature control must be covered before Shabbos. One may not put food directly on a hot plate on Shabbos, even if the food was fully cooked beforehand. If the temperature cannot be set to go above 120 degrees Fahrenheit, you may place food on it on Shabbos. For a more detailed explanation of the issues involved, see "Oven Kashrus: For Shabbos Use"',
      },
      {
        title: 'How do I kasher a standard gas stove top?',
        body: 'A gas stove top has several parts that need to be kashered. To kasher the grates, do the following: 1- Clean the grates. 2- Put them into the oven on 550°F or self-clean for forty minutes. (If the oven is not kosher, it must be cleaned first.) 3- If it is not possible to put the grates into an oven, put a blech (metal sheet) over them and turn the flames on high for ten minutes. Caution: Do one grate at a time or remove the plastic knobs so they don\'t melt. Flames may come out of the sides of the blech. For procedures to kasher the rest of the stove top, see "How to Make a Home Kosher"',
      },
      {
        title:
          'I have a Frigidaire wall oven, model FEB24S5ABB, which is supposed to have a Sabbath Mode. It did not come with the instructions. Do you have the information I need?',
        body: "I have a Frigidaire wall oven, model FEB24S5ABB, which is supposed to have a Sabbath Mode. It did not come with the instructions. Do you have the information I need? I'm sorry, but this model does not have a Sabbath Mode. If you click on the link below, you will see the page from our site listing all Frigidaire models with Sabbath Mode. This particular model is not listed. If someone in the store told you that it does have Sabbath Mode, then you were misinformed. http://www.star-k.org/appliances",
      },
      {
        title: 'Are ovens with a 12 hour shut off suitable for Yom Tov use?',
        body: 'Ovens with a 12 hour shutoff are not suitable for Yom Tov use because they will not allow you to bake on Yom Tov day. The ovens we certify as "Sabbath Mode" are designed for use on Yom Tov and can block the 12 hour shutoff feature.',
      },
    ],
  },
  {
    title: 'Passover Related Questions',
    items: [
      {
        title: 'I have heard that you now say one can kasher smoothtop ranges. Is this true?',
        body: 'Not really, although there have been some new recommendations. Click here for a full discussion of this issue.',
      },
      {
        title: 'How do I kasher my stainless steel sink?',
        body: 'Stainless steel sinks can be kashered using the following method. Clean the sink thoroughly. Hot water should not be used or poured in the sink for twenty-four hours prior to kashering. Dry the sink before kashering. It is recommended that the hot shut-off valve under the sink be turned off twenty-four hours before kashering. Kashering is accomplished by pouring boiling hot water from a Pesach kettle/pot over every part of the stainless steel sink. It is not sufficient to pour on one spot and let the water run down the sink. The poured water must touch every part of the sink including the drain and the spout of the water faucet. It is likely that the kashering kettle will need to be refilled a few times before the kashering can be completed. After kashering, the sink should be rinsed with cold water.',
      },
      {
        title: 'Can I use the warming drawer in my oven on Pesach?',
        body: 'Warming drawers cannot be kashered because the heat setting does not go high enough to constitute libbun(burning). The warming drawer should be cleaned, sealed, and not used for Pesach.',
      },
      {
        title: 'Are peanuts kitniyos? How about anise?',
        body: 'Please click here for a list of kitniyos foods.',
      },
      {
        title: 'Is quinoa considered kitniyos?',
        body: 'No. Therefore, even Ashkenazik Jews may eat quinoa on Passover. Click here for a full explanation.',
      },
      {
        title: 'Can soy cheese be used by Sefardim who eat kitniyos?',
        body: 'Soy is kitniyos. However, soy cheese has additives which may be chometz and/or the cheese may be processed on chometz equipment. Therefore, soy cheese needs reliable Passover certification.',
      },
      {
        title: 'Do I have to peel my fruits and vegetables on Pesach because of the wax coating?',
        body: 'No, waxed fruit and vegetables do not need to be peeled before eating. Any problematic ingredients would be batel in the wax.',
      },
      {
        title:
          'If I have a jar of Kosher for Passover mayonnaise or a plastic soda bottle, do I need to place it in some sort of wrapper in order to put it in a refrigerator (such as in a workplace) which has Chometz in it?',
        body: 'We recommend the container be covered so that chometz will not come into contact with anything you eat.',
      },
      {
        title: 'Does pet food have to be kosher?',
        body: "There is no requirement to feed one's pet kosher food. However, one may not give food containing a mixture of meat and milk to animals at any time during the year. On Passover, the pet food may not contain any chometz. This is because Jews are forbidden to derive any benefit from chometz, and feeding it to animals would be a benefit for us. Click here for our article on feeding your pets.",
      },
      {
        title:
          'I wanted to know what the halacha is regarding backsplashes on Pesach. Must they be covered or is it sufficient to just scrub them ? If they need to be covered, what is the best method for doing so?',
        body: 'Clean them well and cover with tin foil.',
      },
      {
        title: 'Is baby powder okay to use?',
        body: 'Baby powder containing only cornstarch and fragrance is permitted to be used.',
      },
      {
        title:
          'I\'m confused. What does the letter "P" stand for when found next to a certifying agency\'s symbol?',
        body: '"P" stands for "Passover". The word "pareve" is always written out fully and is not abbreviated.',
      },
      {
        title: 'Does breath spray need to be kosher for Pesach?',
        body: 'Breath spray needs reliable Passover certification.',
      },
      {
        title: 'Do I need to buy a new washing cup for my kitchen for Pesach?',
        body: 'Either the washing cup must be kashered or a new one must be purchased. Please note that only a metal cup may be kashered.',
      },
    ],
  },
  {
    title: 'General Kashrus Issues',
    items: [
      {
        title: 'What is kosher salt?',
        body: 'Salt is inherently kosher and does not require certification. Salt which is termed “kosher salt” is a type of coarse salt used in kosherization of meat to facilitate drainage of blood, but is used in cooking as well.',
      },
      {
        title:
          'My husband and I are at odds about whether or not Kosher foods need to be prepared only by Jews',
        body: 'You are both (partially) right. Some foods need to be prepared by Jews, some do not. Examples of foods requiring Jewish involvement are meat, poultry, and fish. The vast majority of commercially available kosher certified foods are not prepared by Jews, only under supervision of the certifying agency.',
      },
      {
        title:
          'Do you have any information in your articles about using tooth whitener on Shabbat or Yom tov?',
        body: 'According to Rav Heinemann, for Shabbos and Yom Tov use, it is not a problem of "coloring" since the change in color is not noticeable overnight. However, the method of application could pose a problem. For instance, the use of an applicator similar to the one used for nail polish would be forbidden because of sechita, squeezing.',
      },
      {
        title: 'Does yeast need kosher certification?',
        body: 'In a word, yes. Yeast is a fungus that has many food applications. Yeast is a fundamental component used in the fermentation of beer, wine and dough. Yeasts are used as flavor enhancers for cheese powders and spice blends. Yeasts are found in nature, and for the most part, natural fungi are kosher. However, commercially produced yeasts are grown and propagated using various media, ingredients and nutrients requiring kosher certification. Natural wine yeasts are found in grapes and would need reliable kosher certification. Autolyzed yeasts are found in beer and would not be kosher for Passover. For these reasons, yeasts require kosher certification.',
      },
      {
        title: 'Are genetically engineered tomatoes kosher?',
        body: "If it looks like a tomato, smells like a tomato, feels like a tomato and tastes like a tomato, it's a tomato and it's kosher.",
      },
      {
        title: 'How does your symbol tell us that something is kosher?',
        body: 'To briefly explain, kosher certification requires a thorough review of;\
                1- All ingredients used in the plant.\
                2- Plant equipment.\
                3- Manufacturing processes.\
                STAR-K personnel, trained in the laws of kosher, food technology and familiar with the food industry and ingredients, visit the plant. If the plant is kosher compliant, the company will have the right to use our symbol on the kosher products. Periodic visits will be made by a STAR-K Rabbinic field representative. On these visits he will check ingredients, products, labels, etc. in order to monitor and audit compliance with the terms of the agreement.',
      },
      {
        title:
          'Your website indicates that the use of "pareve" regarding a food product means that the product contains no meat or dairy ingredients. Does this mean vegans and vegetarians can eat pareve foods without any concern?',
        body: 'Fish and eggs are pareve, since they are neither meat nor dairy, although they are not considered vegan. As far as vegetarians are concerned, there are different levels of adherence and varied opinions as to what vegetarians will accept. We are aware of many vegetarians who seek out pareve foods and feel that pareve satisfies their needs. However, we cannot say definitively that all pareve foods are suitable for all vegetarians. If you have a question about a specific product, feel free to contact us.',
      },
      {
        title: 'Do all foods require a kosher symbol to tell us that they are kosher?',
        body: 'No, some foods are always kosher. Two examples are sugar and raw split peas.',
      },
      {
        title:
          'Can you tell me which responsa discusses how to dispose of Torah material written in English?',
        body: 'Please see our shaimos article for a detailed discussion of this issue',
      },
      {
        title:
          'My firm frequently has lunch meetings where they provide non-kosher sandwiches and the like. They generally will have separate fruit platters with cut fruit as well. Is one permitted to eat the fruit?',
        body: 'We could not recommend the fruit since they may be cut with knives used to cut non-kosher. You could cut off a thin slice of fruit where the fruit has been cut. Discard that slice and eat the rest of the fruit. (You should use a kosher knife which should be washed before further use.) Tart fruits should not be eaten even in this manner.',
      },
      {
        title: 'Are all kosher symbols reliable?',
        body: 'Our policy is not to answer general questions about hechsherim. Please call our hotline at 410-484-4110 if you have a question about a particular product.',
      },
      {
        title:
          'Is an Ashkenazic Jew permitted to eat meat under the supervision of a reliable Sefaradic kashrus organization?',
        body: 'Sefardim may be stringent in some areas of shechita as Bais Yosef requires. This would be acceptable for an Ashkenazi. If, however, the leniencies of Bais Yosef are also followed, then an Ashkenazi should refrain from eating that meat',
      },
      {
        title:
          "I've heard that if you cook or warm a flour tortilla it becomes pas Yisroel. Is that correct even though it may be eaten right from the package?",
        body: 'If the flour tortilla is considered a finished product as sold, and you are cooking it or warming it up (just like putting bread in a toaster) only to change its texture, this would not give the tortilla a status of pas Yisroel. However, if the tortilla requires the extra preparation, then the extra baking gives it the status of pas Yisroel.',
      },
      {
        title: 'Are you allowed to filter tap water on Shabbos, or is it borer?',
        body: 'Assuming that there is no electrical process involved, water may generally be filtered on Shabbos. There is no concern for borer (separating) because the water could be imbibed even without the filtering and the filtering is only for added purity. Additionally, the filtering of tap water is usually only for chemicals invisible to the eye and does not violate the prohibition of borer. (In locales where water is not permitted without filtering due to insect infestation, filtering may be prohibited on Shabbos. Consult your Rav.)',
      },
      {
        title: 'Does every food require kosher certification?',
        body: 'Some items that do not require certification click here for more information.',
      },
      {
        title: 'Do canned mandarin oranges need certification?',
        body: 'If the ingredients are just mandarin oranges, water, and sugar, then it would be fine to use. If you are unsure of other ingredients, you can call us. If they are product of Israel, they would need certificaion due to tithing concerns.',
      },
      {
        title: "What is the appropriate Bracha for hearts of palm? Ho'etz, Ho'adama or Shehakol?",
        body: "The proper Bracha is Ho'etz.",
      },
      {
        title: 'What does a hechsher represent on Cholov Stam milk?',
        body: 'The vitamins and equipment used are kosher. There is no oversight of anything that happens on the farm.',
      },
      {
        title: 'Does rice need to be yoshon?',
        body: 'No, rice does not need to be yoshen. Even though its blessing is mezonos, it is not one of the five grains(wheat, oats, barley, rye, spelt) which could be a yoshon issue.',
      },
      {
        title:
          "I haven't eaten cherries all year. Sould I recite the blessing of shechiyanu when eating cherry pie from a bakery?",
        body: 'It depends if they use fresh or canned cherries. You would not recite the blessing on the canned variety used by many bakeries, but you would recite the blessing if they used fresh cherries.',
      },
      {
        title: 'Do Kashrus Kurrents need to be put in sheimos?',
        body: 'Kashrus Kurrents are sheimos due to the Torah articles.',
      },
      {
        title:
          'Does plain, unseasoned uncooked couscous require certification? The only ingredient is flour.',
        body: 'It is fine to use without any certification, as long as it not a product of Israel. If it is a product of Israel, it requires certification due to tithing and shemitta issues.',
      },
    ],
  },
];

export default function FAQ() {
  return (
    <Wrapper>
      <Typography style={{ marginBottom: 16, textAlign: 'center' }} type="title">
        FAQ
      </Typography>
      {faq.map((item) => {
        return <SingleFAQ key={item.title} title={item.title} questions={item.items} />;
      })}
    </Wrapper>
  );
}
