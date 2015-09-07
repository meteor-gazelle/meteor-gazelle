## Ip Manager
### About
This package provides various validation and management capabilities for ip addresses connecting to the website.
With this package you can track failed login attempts, ban specific or ranges of ip addresses, check connecting clients for banned status.

### Usage
#### isBannedIp
Check if a given ip address has been banned.

Arguments: the string value of the ip address to ban, e.g. '127.0.0.1'.

Returns: true, if the ip is banned; otherwise, false.
```javascript
var ipIsBanned = IpManager.isBannedIp(ipAddr);
```

#### upsertBannedIp
Ban a specific ip address or range of ip addresses from the website. This method also calls to the meteor-gazelle:user-sessions package to logout any connected users that fall within the ip address(es) banned.

Arguments: a JSON object containing the values to ban.
```javascript
{
  startIp: '127.0.0.1',
  endIp: '127.0.0.5', // Optional
  notes: 'Related notes pertaining to the ban', // Optional
  expireOn: new Date() // Optional
}
```

Returns: N/A
```javascript
IpManager.upsertBannedIp(args);
```

#### upsertAndValidateLoginAttempts
Upserts a login attempt record for the given ip address while incrementing the attempt count. Also checks if the given ip address has exceeded the allotted number of login attempts.

Arguments: the string value of the ip address to check, e.g. '127.0.0.1'.

Returns: true, if the ip has exceeded the maximum attempt count; otherwise, false.
```javascript
var ipExceededLoginAttemptCount = IpManager.upsertAndValidateLoginAttempts(ipAddr);
```
