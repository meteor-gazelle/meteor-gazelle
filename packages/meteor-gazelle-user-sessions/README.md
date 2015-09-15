## User sessions
### About
This package tracking and management of connecting user sessions. User session information can be stored in addition to forcing the logout of specific users or users within an ip range.

### Usage
#### upsertUserSession
Creates or updates a user session for a given user id, ip address and user agent.

Arguments:
* userId: the string value of the user id, stored in Meteor.users collection.
* ipAddr: the string value of the ip address of the connecting user, e.g. '127.0.0.1'.
* fullUA: the string value of the entire user-agent.

Returns: N/A
```javascript
IpManager.upsertUserSession(userId, ipAddr, fullUA);
```

#### logoutConnectedUsersByIp
Ban a specific ip address or range of ip addresses from the website. This method also calls to the meteor-gazelle:user-sessions package to logout any connected users that fall within the ip address(es) banned.

Arguments:
* startIpAddr: the specific ip address or start of ip address range to logout connected users.
* endIpAddr: the end of the ip address range to logout connected users, optional.

Returns: N/A
```javascript
IpManager.logoutConnectedUsersByIp(startIpAddr, endIpAddr) ;
```
