# Recurring *Un*toggle

## Context

When the Recurring toggle is enabled, every payment going through Checkout API v69 or below for which a shopperReference
is included in the `/payments` or `/sessions` request will tokenize the shopper’s details for recurring payments. At its
introduction to the Customer Area in 2019, the setting’s default value has been active. Due to being on by default and
merchants often passing a shopperReference for any other valid reason, more payments were tokenized than intended.

## What has been done so far

### Buckets

Based on the impact this setting does/can have on merchants, four categories were drawn up:

#### 1. No-Impact

Merchant does not create tokens.  
This can be because they are never sending in a shopperReference, are not using
the Checkout API, or they are on Checkout API v70 or above. Disabling the Recurring toggle will have no impact on their
integration, but prevents the toggle from affecting their integration in the future.

#### 2. Low-Impact

The merchant *does* create tokens due to the Recurring toggle, but doesn't use on them.  
This is indicated by not using `shopperInteraction: ContAuth`.  
Turning off the toggle therefore likely does not impact them (except for the shopperReference no longer being returned).

#### 3. Medium-Impact

The merchant creates tokens due to the Recurring toggle, and uses (at least some of) them.  
This is indicated by them using `shopperInteraction: ContAuth`.

#### 4. High-Impact

Merchant creates tokens due to the Recurring toggle, and could show these in the Checkout front-end.  
This is the case for merchants that have the ADP `rechargeAddOneClickIfMissing` on either company or merchant level.  
This might include merchants that actually use tokens (merchants with `ContAuth` payments), but not necessarily.

> **Why does the ADP cause tokens to appear in the front-end?**  
The Recurring toggle creates tokens with RECURRING contract only (for Subscription and UCoF payments), these don’t show up in the front-end.
The ADP adds a ONECLICK contract to these tokens, causing them to be show-able on the front-end.

---

Merchants in the medium and high-impact buckets will be informed that the Recurring toggle will be disabled in July
2025, and that they must pass the [correct tokenization parameters](https://docs.adyen.com/online-payments/tokenization/advanced-flow/?tab=checkout_api_v69_or_earlier_2)
in their `/payments` or `/sessions` request to tokenize payments.

### Communication to Medium & High-Impact Merchants

The [Direct Communications Brief](https://docs.google.com/document/d/1v_oj5zv6CgflxDfQ2rFv2rDO1_-Zmw-JgSXTP67O-vc/edit)
outlines how we plan to inform medium and high-impact merchants of the imminent changes.

### Disabling for No & Low-Impact Merchants

Serge wrote a script to which we can pass a list of merchantAccounts, which then disables the Recurring toggle in bulk
and returns a list of merchantAccounts for which a change actually took place.  
All merchants in the no-impact category have been disabled on TEST at the time of writing this (9 Jul '24)

## Strategy

1. Implement functionality to echo back the `shopperReference` passed in the API request in the
response as a setting under Developers > Additional data

2. Disable the no-impact merchants on LIVE concurrently with step 1.

3. Once echo functionality is implemented, disable the toggle for low-impact merchants on TEST.

4. Get in touch with Platform Ops through a [Communications Request](https://docs.google.com/forms/d/e/1FAIpQLSf6GxLhP_ZxPylJ4OVb7bj5A7G0wTdBO9sk8xWHent4538BfA/viewform) to set up a reach-out to medium & high-impact companies, **informing them that they have until July 2025 to implement
tokenization correctly without the Recurring toggle**.  
    1. The [Communications Brief](https://docs.google.com/document/d/1v_oj5zv6CgflxDfQ2rFv2rDO1_-Zmw-JgSXTP67O-vc/edit) and [list of merchants to reach out to](https://docs.google.com/spreadsheets/d/1i3f8O1qszM42kMCdY1Mor0I_9wBc40L99_ev8SXLX1A/edit?usp=sharing) will need to be shared with them.

5. Concurrently with step 4, turn off the toggle for low-impact merchants on LIVE.

6. Remind, support and periodically monitor unintended tokenization traffic.

7. July 2025, begin turning off Recurring toggle for medium & high-impact merchants as well

## Merchant Integration Checklist

1. For payments that they wish to tokenize, are merchants passing the [correct parameters](https://docs.adyen.com/online-payments/tokenization/advanced-flow/?tab=checkout_api_v69_or_earlier_2)
   in the `/payments` or `/sessions` request?

2. Do they expect to always get a shopperReference in their API response? If so, turn on the setting under Developers > Additional Data to echo back a `shopperReference` if one was passed in the API request.

## YouTrack Tickets

- [COAPI-339](https://youtrack.is.adyen.com/issue/COAPI-339/Gradually-disable-enableRecurring-toggle-for-merchants-parent) Gradually disable enableRecurring toggle for merchants (parent)
  - Parent ticket for this project

- [COAPI-243](https://youtrack.is.adyen.com/issue/COAPI-243/Disabling-EnableRecurring-flag-for-some-merchants)  Disabling EnableRecurring flag for some merchants
  - Outlining query and script for bulk account toggle disabling

- [COAPI-528](https://youtrack.is.adyen.com/issue/COAPI-528/Additional-data-setting-to-echo-back-a-shopperReference) Additional data setting to echo back a shopperReference
  
- [DATA-12136](https://youtrack.is.adyen.com/issue/DATA-12136/)  Investigate incorrect Recurring Flagging on Visa Merchants (COF)
  - Original ticket where issue and context ist described
  
- [COM-7124](https://youtrack.is.adyen.com/issue/COM-7124/Visa-AU-Wrongly-Applied-Recurring-Indicator-201998860) Visa AU - Wrongly Applied Recurring Indicator #201998860
  - Compliance issues outlined
  
- [PM-10747](https://youtrack.is.adyen.com/issue/PM-10747/Review-MIT-Recurring-Transaction-Flagging-Across-APIs) Review MIT (Recurring) Transaction Flagging Across APIs
  - Remediation Part 1, lists YouTracks relating to the issue's root causes
  
- [CARDS-319](https://youtrack.is.adyen.com/issue/CARDS-319)  Remediate Incorrect Subscription / Recurring Transaction Flagging (Part 2)
  
- [PM-10692](https://youtrack.is.adyen.com/issue/PM-10692/Incorrect-Recurring-Flagging-on-Checkout)  Incorrect Recurring Flagging on Checkout
  - Overview of changes made to Checkout API to stop issues with v70+

- [TSD-13816](https://youtrack.is.adyen.com/issue/TSD-13816/Delete-tokens-for-LidlAccount)  Delete tokens for LidlAccount
  - Action taken to address GDPR concerns for specific company

## Tools & Resources

- [Google Sheet with all merchant accounts](https://docs.google.com/spreadsheets/d/1AHCeRVRLQ1Nv1wAJRrCWwzPwSqPXj7WmluRO21M3DyQ/edit?usp=sharing)
in scope of the disabling project and which bucket they're in
  
- [Google Sheet of merchants & AMs](https://docs.google.com/spreadsheets/d/1i3f8O1qszM42kMCdY1Mor0I_9wBc40L99_ev8SXLX1A/edit?usp=sharing)
which we plan to reach out to (medium & high-impact buckets).
  
- [Google Drive](https://drive.google.com/drive/folders/15spSCCMIo1RSZuNwoVe1jhwIC2srJhM0?usp=sharing) with all related
  documents, old and current
  
- [Hub Page](https://hub.is.adyen.com/our-solution/payments/online-payments/checkout/recurring_toggle_phaseout?) for the Recurring toggle project

- [Checkout API v70 Tokenization](https://hub.is.adyen.com/our-solution/payments/online-payments/checkout/support/tokenization-checkout-api-v70) Hub page

- [Elastic Search](https://live-logsearch.is.adyen.com/s/live-application-logs/app/discover#/?_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-60m,to:now))&_a=(columns:!(beat.webapp,classname,threadid,pspReference,traceId,fullmessage,ms,accountCode),filters:!(),index:applogs-read,interval:auto,query:(language:kuery,query:'message:%22Merchant%20has%20not%20explicitly%20requested%20storage%20of%20payment%20details%20but%20Checkout%20will%20store%20it%20due%20to%20legacy%20behavior.%22'),sort:!(!('@timestamp',desc))))
to find transactions for which "unintended" tokenization took place
  - You can add `AND accountCode:"COMPANY_ACCOUNT"` to filter the results

- [Looker Explore](https://looker.is.adyen.com/explore/accountcheck/account?qid=AFDKA69IYLR1L0JqJcHCJl&toggle=fil) to
find Account Managers for given accounts.
  
- [Google Slides](https://docs.google.com/presentation/d/1_UwOuOKpUR3FEKywQCT_pxUt6UXC7vic6oaLDrQEPts/edit?usp=sharing)
giving an overview of the Recurring toggle issue.
  
## Known Payment Method-Specific Issues

- **PayPal** requires merchants to be enabled for recurring transactions on the PayPal platform. If they unintentionally
tokenize with us this causes transactions to fail.
  
- **KakaoPay**'s default contract and MID does not permit recurring. Transactions stay in Offer status, due to
  attempting the auto-debit flow with AntFinancialOSP

- **Vipps** no longer supports recurring sign-ups since Feb '24. If a merchant starts offering Vipps while they have
  the Recurring toggle on, this will result in refused Authorisations unless they are specifying that they don't want to
  store information within their API requests.
  
## Project Timeline

| Date        | Development |
| :---------- | :---------- |
| **Nov '17** | The Recurring toggle has been enabled by default on API level with the introduction of Checkout API v32 with the intention of making tokenizing payment details easier. |
| **Jan '19** | The Recurring toggle logic has been moved from API to a merchant-facing setting in the Customer Area, still enabled by default. |
| **Aug '21** | Visa AU brought up incorrect recurring flagging - internal investigation started. |
| **Mar '22** | Changes made to set the Recurring toggle as inactive by default for any new merchant accounts. |
|   | Added disclaimer message next to the toggle informing merchants of the use-case for the Recurring toggle. |
| **Jan '23** | API v70 released: Fully removes functionality of the Recurring toggle setting. |
|   | Added logline for payments where the Recurring toggle's functionality has kicked in. |
| **Jun '23** | Reached out to Dominos about un-toggling for affected accounts under Dominos, DominosFrance & DominosDeutschland.
| **Apr '24** | Data collected to categorize all merchants in terms of impact
| **Jun '24** | Started disabling the toggle for no-impact accounts.
| **Aug '24** | Messaging sent to impacted accounts to inform them of the imminent changes to the Recurring toggle. Merchants urged to implement tokenization correctly.
| **Jul '25** | Deadline for merchants to correctly implement tokenization. Recurring toggle disabled for all accounts on LIVE.

***

### Notes

- Merchants using the **Microsoft Dynamics 365 plug-in** cannot have the toggle disabled for them as this would cause
  their entire payments processing to break. Whether a merchant uses the plug-in can be checked via `applicationInfo`.
  - Microsoft is working on a change to the D365 plug-in, which will send in the correct flags in the `/payments`
      requests, solving the issue for these merchants. @laure is the person to reach out to for information on this.
- Companies **GoProInc** and **PhoneBox** have some merchant accounts in either of the *medium* and *high*-impact
  categories. If any issues might arise during turn-off, this might be a consideration.
