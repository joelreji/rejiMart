import React, { useState } from "react";
import './Components.css';
import { Container, Card, Footer } from "react-bootstrap"

const pos = () => {


    return (
        <div>
            <Container>
                <Card className="border-0 pt-2 pb-5 text-center">
                    <Card.Header className=" bg-white border-0 display-6 fw-bold">Market pricing for high foot traffic stores</Card.Header>
                </Card>
                <p>
                    Recently, I was at a football game with some friends and we were all in line to purchase some beers before the game started.
                    We were all thinking about what beers we wanted to buy and they all seemed to be marked up, which is expected at a big sporting
                    event. While we were deciding which beer there were three key considerations being made: which one is the cheapest?, which one has
                    the most bang for your buck?, and finally, which one is the favorite?
                    <br></br>
                    <br></br>
                    Cheapest is the easiest because you can clearly see on the pricing board which one would be the cheapest. But it turned out that the cheapest
                    was a smaller volume than the other beers listed so it wasn't an equivalent decisioning method, so we get to most bang for your buck.
                    If you take both the volume of beer and the price, you can quickly figure out the unit price. By the way, it took me a while to figure out that 
                    all grocery stores report the unit price on their prices so you can make easier comparisons. The final way that I saw us decision making was by 
                    favorites. Since most of the prices are similar in range, a lot of people will often get the beer that they like the best. Obviously, there could 
                    be some fundamental differences between these beers like the type of beer (light, IPA, lager etc.) but often these are priced similarly in busy
                    areas like a football game. 
                    <br></br>
                    <br></br>
                    This got me thinking. What if places where people expect there to be markups, were driven by market principles rather than just the standard pricing.
                    All of the products have a maximum and minimum price in order to ensure that the market doesn't get too out of whack but at the same time the prices
                    of the peer products fluctuate based on basic market demand and supply. For example, lets create a thought experiment where there are 3 beers at a
                    store and there are 100 of each. I created a program so we can step through consumer behavior.
                    <br></br>
                    <br></br>
                    <img src="initial.png"alt="Starting state" style={{ margin: 'auto', display: 'block' }}></img>
                    <br></br>
                    <br></br>
                    I created 3 beers where the third beer costs 11 dollars while the other two cost 10 dollars. There are 100 available units that exist for each beer.
                    As the game starts, first someone comes and buys 2 of Beer3. This will effectively push the price of the third beer up which pushing the price of the
                    other two lower. As you can see in the image below the price of Beer3 has flucuated along with the price of the other two. 
                    <br></br>
                    <br></br>
                    <img src="step1.png"alt="Step 1" style={{ margin: 'auto', display: 'block' }}></img>
                    <br></br>
                    <br></br>
                    Now lets run a series of transactions, each which are changing the price at its execution, just like a real market. We will perform three purchases, 
                    10 of Beer1, 2 more of Beer3, and 20 of Beeer2. Below image shows the current market conditions:
                    <br></br>
                    <br></br>
                    <img src="step2.png"alt="Step 2" style={{ margin: 'auto', display: 'block' }}></img>
                    <br></br>
                    <br></br>
                    There are some key things to note here: the price of Beer1 and Beer3 have reached the same price but their quantities are different. Alos currently the
                    price of Beer2 is at 20 dollars which is exactly 4 times the price of the other two. Now what would happen if 5 more people came and purchased Beer2?
                    Interestingly enough, the prices are unchanged, this is because when creating this system I had created maximum and minimum values. For the merchant, 5 
                    dollars is the minimum price they are willing to sell their product and 20 dollars is the most the merchant believes he can charge the customer without 
                    turning them off. 
                    <br></br>
                    <br></br>
                    <img src="step3.png"alt="Step 3" style={{ margin: 'auto', display: 'block' }}></img>
                    <br></br>
                    <br></br>
                    The way that I see it, people will naturally gravitate towards beers that may be on "sale" at certain points while some people continue to buy their 
                    favorites regardless of the price. The important factor to note here is that this pricing strategy would be used by merchants who own stores 
                    in areas with high foottraffic where the price is expected to be higher. I believe in this pricing strategy both the merchant and the people 
                    purchasing the beer could end up with a win-win scenario. There could be some big pitfalls to this idea like what happens if everyone coordinates their
                    beer purchases to make sure the "worst" beer is the most expensive. 
                    
                     <strong>This year I want to understand if a system like this can be integrated into a point
                    of sale machine so that these special types of merchants can offer competitive pricing.
                    </strong>
                </p>
            </Container>
            <footer className="text-center mt-4 py-2" style={{ backgroundColor: '#f8f9fa' }}>
                <p>© {new Date().getFullYear()} Joel Reji. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default pos;