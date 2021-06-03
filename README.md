
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

```javascript
import makeCleanupTimer from 'switchable-cleanup-task-timer-210601-pmb';
```


### const timer = makeCleanupTimer([ovr])

Creates and returns a cleanup timer, with default settings, as described below.
If an optional config object `ovr` is provided, its properties will be
assigned to the timer, overwriting same-named default settings.

* ⚠ Timers are initially disabled. ⚠
  * If you want to start it immediately, append `.enable()` to the above.


### Default settings

These are properties of the `timer` object:

* `.task`: What to do when it's time to clean up.
  Should be a false-y value to do nothing, or a function.
  If the task function returns a then-able (e.g. a Promise),
  the new schedule will be delayed until the `then` triggers
  (Promise resovles).
  Default: `false`
* `.intervalMs`: Timer interval, in milli-seconds.
  Has the same length limitations as `setTimeout`.
  Default: `60e3` = 60.000 ms = 1 minute
* `.name`: Human-readable identifier, for stuff like error messages.
  Default: `'unnamed timer'`
* `.important`: Whether future schedules for this timer are important
  enough to keep the process alive.
  If there already is a schedule, it will not be affected by this option.
  See also `.applyImportance`.
  Default: `true`
* `.again`: Whether the shedule should be renewed after the next cleanup.
  If set to a false-y value, the next cleanup will be the last one.
  Default: `true`


### .once()

Plan one next cleanup:
If there currently is no schedule, a new one will be started,
which will observe `.important`.
Does not modify `.again`.
Returns the timer.


### .enable()

Ensure the timer is active.
This will set `.again = true`.
Also, if there currently is no schedule, a new one will be started.
Returns the timer.


### .disable()

Ensure the timer is off.
This will set `.again = false`,
and it will dismiss the current schedule if there is any.
Returns the timer.


### .unschedule()

_(You should never need this.)_
Just dismiss the old schedule, if any.
Returns the timer.


### .restart()

Dismiss the old schedule (if any), then start a fresh schedule.
Does not change the `.again` flag.
Returns the timer.


### .triggerNow()

Drop the old schedule, trigger immediately,
and if after that, `.again` is (still) enabled, start a new schedule.
Returns the timer.


### .applyImportance(im)

Set `.important = im`, unless `im === undefined`.
If there is a current schedule, adjust its importance, effective immediately.
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
