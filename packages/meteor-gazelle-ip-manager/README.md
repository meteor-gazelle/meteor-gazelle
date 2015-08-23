## Ip Manager
### About
This package provides various validation and management capabilities for ip addresses connecting to the website.

### Usage
#### isBannedIp
Check if a given ip address has been banned.
```javascript
var ipIsBanned = IpManager.isBannedIp(ipAddr);
```

#### banIpAddress
Ban a specific ip address or range of ip addresses from the website. This method also calls to the meteor-gazelle:user-sessions package to logout any connected users that fall within the ip address(es) banned.
```javascript
IpManager.banIpAddress(notes, startIpAddr, endIpAddr);
```

#### exceededLoginAttempts
Check if a given ip address has exceeded the allotted number of login attempts.
```javascript
var exceededAttemptCount = IpManager.exceededLoginAttempts(ipAddr);
```

#### upsertLoginAttempt
Creates a new login attempt document for a given ip address or increments the attempt count of an existing one.
```javascript
IpManager.upsertLoginAttempt(ipAddr);
```
