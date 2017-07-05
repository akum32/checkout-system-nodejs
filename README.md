### Checkout System (Backend)

Pre-requisites: Nodejs v8.1.2
Install dependencies: npm install
Run tests: npm run test

#### Problem
- To implement a checkout system that calculates the total of all items by applying any 
customer specific pricing rules (i.e. discounts). The checkout interface looks like: 
```
const checkout = new Checkout(...);
checkout.add(itemId);
checkout.add(itemId);
checkout.total();
```

#### Assumptions
- All product and discount prices are stored in cents to avoid rounding issues. These could
be easily be formatted to dollars as required. Another option could have been to use a library 
like big.js or decimal.js for pricing and calculations, but avoided for now.

#### Design Notes
- Full async API to support the lookup of products and price rules from an external store 
(e.g. database) instead of just hardcoded values.

- Pricing rules are applied in the form of adjustments which can be at the product level or the 
entire checkout level (e.g. 10% off if total price > $1000). In addition, all adjustments are made 
available to subsequent rules via `pricingContext`. This allows for more advanced scenarios if a 
rule needs to check whether an adjustment has already been applied. 

- The use of _ infront of attributes and functions implies a 'private' member.
