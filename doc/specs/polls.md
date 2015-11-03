The new system has two poll types, both allow for multiple choices to be made and the second systems allows for choices to be weighed and ranked.

## 1. Multiple Choice Polls (basic)
* Checkboxes would appear next to each entry. A user could select multiple checkboxes.
* The poll creator could enter a number into a "Choices Allowed" field. This value would determine the max number of choices a user could select. Leaving the field blank or entering "0" would mean unlimited choices.
* The same goes for "Choices Required" field, except it's the minimum choices. Leaving the field blank, or entering "0" or "1" would specify that 1 choice is required.
* If a user submits a vote total over the maximum amount, a notification will tell him that his vote wasn’t counted and that he should try again. 
  * Alternatively: voting over the maximum amount would be impossible because the checkboxes would grey out once the maximum number of choices was met. 
  * Alternatively # 2: voting over the maximum amount would be impossible because the submit button would disappear if too many choices were selected.
*If a user submits a vote total below the required amount, a notification will tell him that his vote wasn’t counted and that he should try again. 
  * Alternatively: voting under the required amount would be impossible because the submit button wouldn’t appear if too few choices were selected.

### 1b. Calculating and Displaying Results
* There would be three display modes. These could be selected before the poll is made, and toggled between at anytime thereafter by the poll creator or a Staff member. If we wanted, we could also allow users to switch between the first of these two by treating them as ‘views’ of the same data, with the initial selection merely serving to indicate the default view.
  * Percentages: This would display the % of votes against the total number of voters and rank the choices accordingly.
  * Totals: this would display the raw vote totals and rank the choices accordingly.
  * Hidden: No data is shown until the poll concludes (at a point determined by the poll creator or a staff member). This prevents users from influencing one another as they vote.

## 2. Multiple Choice Polls (ranking)
* This poll type allows for multiple choices, but it depends entirely on a points system to produce two types of results.
* This system centers around the allocation of 100 ‘points’ which are given to each user. This can also be conceptualized as a total percentage (100%). This value can be distributed among the various choices.
* A user must allocate points to at least one choice. As there are 100 points to spend, a user would theoretically be constrained by an upper-limit of 100 choices.
* All points must be spent. The numerical value of the number of points being allocated to a given choice is typed into a box to the left of the choice.
* A point counter at the top and bottom of the poll lists the number of remaining points. As the allocated values change, so does the value in the point counter.
* A vote can be submitted only when the Point Counter reads 0 and all points have been spent.

### 2b. Calculating and Displaying Results
* Three calculations would occur to create results. These calculations would produce two columns of data.
* Preference (Calculation 1): This would display the percentage of points earned by a given choice against the total number of points currently in the system (100 times the number of voters). These results would display in their own column.
* Rank (Calculations 2 and 3): Rank is determined via a secondary, hidden points system. It works as follows: every time someone allocates their points, their favorite is represented by the choice with the most points. This choice becomes ‘1st’. The choice with the second greatest number of points becomes ‘2nd’. The choice with the third greatest number of points becomes ‘3rd’. All other choices with points become ‘other’. Choices with no points get no rank. The ranks correspond to the following, hidden ‘rank point’ totals:
  * 1st: 10 rank points
  * 2nd: 5 rank points
  * 3rd: 3 rank points
  * Other: 1 rank point
  * No rank: 0 rank points
