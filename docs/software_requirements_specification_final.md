### Welcome to our food recipe app! Our food recipe web application is a versatile kitchen companion that provides customers with numerous advantages. It makes meal planning easier by offering a wide variety of recipes that respond to various cuisines and dietary needs. Users, whether freshmen or experienced, are guided through the cooking process with simple directions and ingredient lists. The application assists in the discovery of new meals, increasing one's cooking skills. It promotes healthy choices by enhancing efficiency with features such as shopping lists and nutritional information. Finally, a food recipe app makes cooking easier, accessible, and enjoyable bringing excellent cooked meals to the forefront of daily life.

# Functional Requirements
### Secure Login and Signup Page

   |        ID       | Requirement |
   | :-------------: | :----------: |
   | FR1 | Users must be able to create a new account by providing a valid email address, a unique username, and a secure password. |
   | FR2 | Integrated MFA, requiring users to enter a code sent to their registered email after entering the correct username and password.|
   | FR3 | Upon clicking cancel button for verification code pop up, User should need to look the email for new code for login to website. |
   | FR4 | Users will receive a confirmation email upon successful registration, providing a link to activate their account. |
   | FR5 | Implemented RBAC to assign appropriate roles to users during signup, restricting or granting access based on their roles. User can access admin privileges using the sign in of email addresses procured with admin rights. |
   
### Home Page

   |        ID       | Requirement |
   | :-------------: | :----------: |
   | FR7 | Upon successful login, users must be automatically redirected to the home page. |
   | FR8 | Implemented a category dropdown to allow users to browse food items by category. |
   | FR9 | Included a search bar for users to find specific food items quickly. |
   | FR10 | Ensured that the category dropdown is dynamically populated based on available categories in the system. |
   | FR11 | Design the home page to be visually appealing and user-friendly, providing an intuitive interface for users. |
   | FR12 | Ensure that the home page is responsive, adapting to different screen sizes and devices for a consistent user experience. |

### Search Functionality 

   |        ID       | Requirement |
   | :-------------: | :----------: |
   | FR13 | Users should be able to search for food items by selecting a category from the dropdown menu. |
   | FR14| Allow users to search for food items using keywords in the search bar. |
   | FR15 | Display search results quickly, with a responsive interface to provide a seamless user experience. |
   | FR16 | Enable sorting options for search results (e.g., by categories of diets) |
   | FR17 | Provide filters to narrow down search results based on dietary preferences or other relevant criteria. |

### Recipe Display 
   
   |        ID       | Requirement |
   | :-------------: | :----------: |
   | FR19 | Clicking on food item images should lead users to a page displaying the detailed recipe for that specific item. |
   | FR20 | Display detailed recipe information, including ingredients, preparation steps, and nutritional facts. |
   | FR21 | Design the recipe display page to be interactive, allowing users to easily navigate through the recipe content. |
   | FR22 | Presence of add button to add the recipe to the cart. |
   | FR23 | Ensure that the recipe display is optimized for mobile devices, allowing users to access recipes on the go.|
   
### Adding Items to the Cart
   
   |        ID       | Requirement |
   | :-------------: | :----------: |
   | FR24 | Users should be able to add selected food items to their shopping cart with a user-friendly "Add to Cart" button. |
   | FR25 | Display a notification confirming the successful addition of an item to the cart. |
   | FR26 | Users should be able to view and manage the items in their cart on a dedicated cart page. | 
   | FR27 | Save the contents of the cart between user sessions, ensuring that items persist even if the user logs out. |
   | FR28 | User will be notified about the order confirmation when they clicked on proceed button  from cart page |

# Non-Functional Requirements
### Usability

   |        ID       | Requirement |
   | :-------------: | :----------: |
   | NFR1 | The application's navigation must be simple, allowing users to move between areas and functions with ease. | 
   | NFR2 | Maintain a consistent user interface design across all screens to ensure that users have a consistent and familiar experience throughout the program. |
   | NFR3 | For maximum user experience on different devices, the application should have a responsive design that adapts fluidly to various screen sizes and resolutions. |
   | NFR4 | On typical internet connections, pages and functionality should load in under 2 seconds, improving the user experience by reducing wait times. |
   | NFR5 | Ensure that the application complies with the Web Content Accessibility Guidelines (WCAG) to make it accessible to people with impairments, encouraging inclusion and usability for all. |

### Scalability 

   |        ID       | Requirement |
   | :-------------: | :----------: |
   | NFR6 | The application must be scalable in order to accept users from different geographical areas while maintaining responsiveness and performance. |
   | NFR7 | The efficiency and speed of the program must be exact for accessing and interacting with it. |
   | NFR8 | The app should be scalable so that it can support real-time updates like stock availability, pricing changes, and order status, ensuring that users receive accurate and timely information. |    
   | NFR9 | The app should be able to run on any device in any worldwide region. |
   | NFR10 | As the platform expands, the system should be able to easily handle more suppliers, commodities, and inventory information. |

### Compatability

   |        ID       | Requirement |
   | :-------------: | :----------: |
   | NFR11 | For widespread accessibility, provide cross-browser compatibility with major browsers (Chrome, Firefox, Safari, and Edge). | 
   | NFR12 | Support the most recent versions of major operating systems (Windows, macOS, and Linux) to ensure widespread accessibility. |
   | NFR13 | Tests and updates compatibility with new browser releases on a regular basis to ensure optimal performance and functionality. |
   | NFR14 | Tests and updates compatibility with new browser releases on a regular basis to ensure optimal performance and functionality. |
   | NFR15 | To ensure accessibility for users with varying needs, maintain compatibility with common screen readers and assistive technologies. |

### Perfomance
  
   |        ID       | Requirement |
   | :-------------: | :----------: |
   | NFR16 | Loads application pages in 3 seconds, eliminating user annoyance and guaranteeing a responsive user experience. |
   | NFR17 | Optimize database queries on a regular basis to ensure effective data retrieval and high performance levels. |
   | NFR18 | Implement continuous server resource monitoring to identify and address any performance bottlenecks in real time. |
   | NFR19 | Use appropriate caching solutions to reduce load times and increase overall system performance in order to boost customer satisfaction. |
   | NFR20 | Perform regular performance testing to discover and address any potential issues, ensuring that the application works optimally under a variety of scenarios. |
   
### Security
   
   |        ID       | Requirement |
   | :-------------: | :----------: |
   | NFR21 | The application must run without any security problems or malfunctions, ensuring smooth performance and vulnerability protection. |
   | NFR22 | Users should move securely between sections, ensuring that transitions from the homepage to product categories and particular products are secure from unauthorized access.|
   | NFR23 | Each UI panel must be provided in a user-friendly way that promotes reading and understanding while prioritizing security measures. |
   | NFR24 | The user interface should be simple, allowing customers to add products to their cart, move to checkout, and complete secure purchases without needing to consult a manual. |
   | NFR25 | The search tool must return accurate and relevant results quickly, using auto-suggestions and filters, while also assuring the confidentiality of user search data. |

# Change Management Plan

### How To Train the People To Use The Application: 

The Food Recipe Application provides a consistent user experience by prioritizing accessibility and easy navigation. A beautifully-designed site greets users, providing a taste of the application's comprehensive capabilities as well as a direct access to the signup/sign-in page, assuring a simple onboarding experience.

Users are sent to the Registration Page after selecting the "Signup" button, where they may easily create accounts by submitting necessary information and creating a secure password. The user-friendly design promotes user comfort, making account creation a quick and painless procedure. Following successful registration, a "Login" button appears, taking readers to a compelling home page featuring a broad variety of tasty foods from many cuisines.

A prominently placed search bar in the navigation bar improves the application's navigation. This tool allows users to easily explore specific recipes, resulting in a more personalized and individualized culinary experience. Each recipe page includes detailed instructions, ingredient lists, and mouth-watering photos, enhancing the user's exploration of various culinary delights.

By adding recipes to their basket, users can create their own virtual cookbook. This cart feature allows customers to evaluate and edit their selected recipes before proceeding to the checkout. This feature is intended to increase user participation and simplify the process of meal planning and organization.

The application's functionality for managers is expanded to include a specific sign-up process. Managers can create accounts by providing the required information and creating unique usernames and passwords. This gives them access to a more robust collection of capabilities, allowing them to easily organize recipes, manage inventories, and work with team members. Managers can safely log off after completing activities, ensuring effective access control and the integrity of sensitive data.

With its user-centric design and management features, the Food Recipe Application serves as a comprehensive platform for both cooking lovers and culinary professionals. The emphasis on usability, straightforward navigation, and collaborative elements sets the setting for an enjoyable and efficient gastronomic adventure.

### How To ensure that it integrates within their ecosystem / software:

Robust APIs and webhooks are essential to a food recipe web application's optimal integration. Users can search recipes and manage favorites with ease thanks to well-documented APIs, and real-time updates are made possible by webhooks, which boost user engagement. Ensuring compatibility and interoperability with other platforms through adherence to industry data standards, like JSON-LD, facilitates the seamless exchange of recipe information.

Enabling users to log in with their current credentials from different platforms simplifies user access when OAuth is implemented for authentication. In order to accommodate a wide range of preferences, responsive design and cross-browser compatibility guarantee a consistent user experience across devices. Personalized user profiles that include the ability to manage dietary restrictions and link social media accounts improve personalization and allow the application to be easily integrated into users' daily routines.

The utility of the application is increased by taking into account third-party integrations, such as connecting with fitness trackers or grocery delivery services, giving users a complete experience. It is possible to identify any integration challenges and make continuous improvements by actively seeking user feedback and carrying out comprehensive testing. Having thorough documentation and fast customer service helps developers incorporate the application into their software with ease. Last but not least, making sure data protection laws are followed upholds legal obligations, fosters trust, and increases user confidence in the application's ecosystem.

### To ensure that discovered Issues are ressolved:

A solid testing framework is used to ensure successful issue resolution. Each issue is subjected to unit and integration tests, ensuring not only individual fixes but also overall system stability. Backtesting methodologies protect present functionality and prevent regressions during resolution.

The resolution of issues is thoroughly recorded, including problem descriptions, root causes, and solutions. This data is incorporated into the application's documentation and version control system, allowing for a clear understanding and historical context.

Real-time monitoring systems discover abnormalities and performance concerns, sending alerts to developers for prompt action. A user feedback loop facilitates the reporting of ongoing or new issues. This constant feedback enables quick response, root cause analysis, and preventive steps to increase stability.
  
# Traceability links
## Use Case Diagram Traceability
 
| Artifact ID | Artifact Name | Requirement ID |
| :-------------: | :----------: | :----------: |
|    Id1     | Signup & Signin   |    FR1,FR4   |
|    Id2     | Browse Recipe Items    |       FR13. FR16   |
|    Id3     | Add To Cart   |       FR24, FR26    |
|    Id4     | Recipe Display   |   FR19, FR20, FR23    |
|    Id5     | Shopping Cart   |   FR24, FR26   |


## Activity Diagram Traceability

| Artifact ID | Artifact Name | Requirement ID |
| :-------------: | :----------: | :----------: |
|    Id6     | View Cart    |     FR23    |
|    Id7     | Proceed to checkout  |     FR22     |
|    Id8     | Enter Address   |    TBD     |
|    Id9     | Make Payment   |     TBD     |
|    Id10     | Order Complete   |     FR26     |
|    Id11     | Search Recipes   |     FR11, FR14     |


## Class Diagram Traceability

| Artifact ID | Artifact Name   | Requirement ID |
| :-------------: | :----------: | :----------: |
|    Id12   | Class User      |     FR26, FR5    |
|    Id13    | Class Homepage  |   FR6 - FR10    |
|    Id14    | Class Search   |     FR11 - FR15     |
|    Id15    | Class Recipe      |     FR16 - FR20     |
|    Id16    | Class ShoppingCart |	FR21 - FR25 |
|    Id17    | Class Orders | FR26, FR28 |
|    Id18    | Class login |	FR1, FR2, FR4, FR5 |

# Software Artifacts

This guides application artifacts, aligning function/non-functional requirements; links reference each artifact.

* 
* 
* 