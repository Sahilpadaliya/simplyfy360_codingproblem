// Question 2:

// Both Alice & Bob have friends. Create a Java/Python/JS/Typescript console application to find all the friends of Alice and all the friends of Bob & common friends of Alice and Bob.
// Your algorithm should be able to do the following:
// Take any 2 friends and find the common friends between the 2 friends
// Take any 2 friends find the nth connection - for example: connection(Alice, Janice) => 2
// Alice has friend Bob and Bob has friend Janice, if the input given is Alice and Janice the output should be 2, meaning 2nd connection, that means Janice is the second connection of Alice and Bob being the 1st connection of Alice.
// Likewise if input given is Alice and Bob, the output should be 1, for 1st connection
// If there is no connection at all, it should return -1



function findFriends(person) {
    var friends = [];
    for (var i = 0; i < person.friends.length; i++) {
      friends.push(person.friends[i]);
    }
    return friends;
  }
  
 
  
 