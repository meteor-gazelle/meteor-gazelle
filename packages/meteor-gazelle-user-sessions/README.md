## User sessions
### About
This package provides various validation and management capabilities for ip addresses connecting to the website.
With this package you can track failed login attempts, ban specific or ranges of ip addresses, check connecting clients for banned status.

This package provides

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
