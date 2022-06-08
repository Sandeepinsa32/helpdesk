<!-- https://datastudio.google.com/u/0/reporting/2975876c-76bc-4c5c-9775-74544276471c/page/ElInC -->

---

## DONE

1. --> css for breakpoint --done
2. use substring in data --done
3. add new record responsive --done
4. global record style --done
5. raised request admin page style --done
6. style update record --done
7. style log modal --done
8. request style responsive , airline confirmation --done
9. agent modal and profile modal wrap in card -done
10. loader on modal , add new record , add new agent , upadte record --done
11. View Charge Request onsubmit close --done
12. payment status , show comment --done
13. email template --done
14. charge button ,airline button ---done
15. number field change fromik number --> string && validation on -ve number ----done
16. card validator api needed : -----> Testing Pending
17. testing 48 hours disable functionality : -----> Testing Pending
18. airlineLocator value is not showing a : -----> Testing Pending
19. 48 hours edit for agent: -----> Testing Pending
20. 48 hours edit for admin: -----> Testing Pending

#### PENDING

1. only can see global card detail after 48 hours mask card
2. Disable add new card button when record is in view mode
3. updating global record page with latest my record pae
4. docusign card validator
5. email foramt
6. Disable submit button if pnr is empty
7. Disable button when required
8. email field validation
9. remove unused code
10. val. err message on type cast

11. making dropdown for cc used:

### TESTING

-

1. Login issue of new agent ---done
2. dashboard active link --done
3. product tpye markup in folat --done
4. dep . & return date required --done
5. check role of current user --> only in global record (admin can update record even after 48 hours) --done
6. send remark in update records in payload -- done
7. all field req on request charge --done

8. airline loctor: --- missing from backend
9. remove arr.reverse() in log : --- Removed from frontend && [ending form backend]
10. update agent password :

11. disble update

12. hide charge transaction from agent
13. desc missing in admim charge transac
14. modal close on update &&& rest value of field --done

15. airline locator 16.update -admin after 48 hours on global record
16. CheckViewUpdate

# {

    "firstName": "alexa",
    "lastName": "amazon",
    "email": "alexa@amazone.com",
    "phone": 9874561230,
    "alternateEmail": "",
    "alternatePhone": "",
    "pnrNo": "1 SS2 5D5D D5JCJHBDC CNCAJNHC CSCS",
    "airlineCode": "DL",
    "airlineLocator": "H3YKZI",
    "bookingType": "new",
    "bookedOn": "trippro",
    "fareType": "publish",
    "productType": [
        {
            "property": "flight",
            "propertyMarkup": "10.1"
        },
        {
            "property": "car",
            "propertyMarkup": "0.2"
        }
    ],
    "mcoNo": 55,
    "totalInhouseCharge": 20,
    "adultCount": 2,
    "childCount": 2,
    "elderCount": 0,
    "grandTotal": 2,
    "childPrice": 2,
    "adultPrice": 2,
    "elderPrice": 0,
    "departureDate": "06/16/2022",
    "returnDate": "06/23/2022",
    "isCompanyCCUsed": true,
    "ccTimes": 2,
    "ccAmount": 2,
    "ccDigits": 2323,
    "card": [
        {
            "cardHolderName": "testCard",
            "cardHolderNumber": "8427175553",
            "cardNumber": "4263982640269299",
            "expiryDate": "06/08/2032",
            "cvv": "123"
        }
    ],
    "totalMarkup": 10.299999999999999

}
