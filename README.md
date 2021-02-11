# Reaktor Pre Assignment API Code

Task Description: https://www.reaktor.com/junior-dev-assignment/

This repository is 1 part of the 2 part solution that I came up with. (other part repo: https://github.com/aralacikalin/reaktor-assignment) Back end logic of the task is stored in this repository. 
This part is deployed at heroku (https://calm-temple-69565.herokuapp.com/) This Heroku link is only used by the front end client. heroku link doesn't display anything (it works only as a API). 
This part consists of a express.js server which serves the front end client which is located on github pages (https://aralacikalin.github.io/reaktor-assignment/) 


I created this back end server as a middle man between legacy API provided and the front end client that I created. Because that availability information takes long time to arrive, I created this API to handle that problem. This API gets all of the availability info for all manufacturers every 5 minutes. I picked 5 minutes for this interval because it is said in the assignment that APIs have an internal cache of about 5 minutes.
Because of this 5 minute cycle when front end client asks for availability info the information is already stored in the middle man API and can be sent much faster than the legacy API.
However every other 5 minutes this API requests availability information from legacy API and because of that while this request is happening no availability information will be sent to front end client and because of that front end client must be refreshed in order to get this information.
