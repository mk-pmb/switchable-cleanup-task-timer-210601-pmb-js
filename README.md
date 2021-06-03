
<!--#echo json="package.json" key="name" underline="=" -->
switchable-cleanup-task-timer-210601-pmb
========================================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
A setTimeout-based setInterval-replacement that I can .disable() and .enable()
at any time, without causing extra delay.
<!--/#echo -->



API
---

This module exports one function:

### const timer = makeTimer([ovr])

Creates and returns a cleanup timer, with default settings, as described below.
If an optional config object `ovr` is provided, its properties will be
assigned to the timer, overwriting same-named default settings.


### Default settings

These are properties of the `timer` object:

* `.task`: What to do when it's time to clean up.
  Should be a false-y value to do nothing, or a function.
  Default: `false`
* `.intervalMs`: Timer interval, in milli-seconds.
  Has the same length limitations as `setTimeout`.
  Default: `60e3` = 60.000 ms = 1 minute
* `.name`: Human-readable identifier, for stuff like error messages.
  Default: `'unnamed timer'`
* `.again`: Whether the shedule should be renewed after the next cleanup.
  If set to a false-y value, the next cleanup will be the last one.
  Default: `true`


### .enable()

Ensure the timer is fully active.
This will set `.again = true`.
Also, if there currently is no schedule, a new one will be started.
Returns the timer.


### .ensureNext()

Ensure there will be at least one next cleanup:
If there currently is no schedule, a new one will be started.
Does not modify `.again`.
Returns the timer.


### .disable()

Ensure the timer is off.
This will set `.again = false`,
and it will dismiss the current schedule if there is any.
Returns the timer.


### .restart()

Dismiss the old schedule and start a fresh schedule.
Does not change the `.again` flag.
Returns the timer.


### .triggerNow()

Drop the old schedule, trigger immediately,
and if after that, `.again` is (still) enabled, start a new schedule.
Returns the timer.







Usage
-----

:TODO:


<!--#toc stop="scan" -->



Known issues
------------

* Needs more/better tests and docs.




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
