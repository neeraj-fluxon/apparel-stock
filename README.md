Apparel Invenotry management

How to run


API List

1) List the available items
   GET http://<IP>/inventory/list --(all items)
   GET http://<IP>/inventory/list?article=Tshirt (all article name with Tshirt)
   GET http://<IP>/inventory/list?article=Tshirt&vendor=vendor1 (all article name with Tshirt from vendor vendor1)

2) Update the quantity and price for list of items for specific vendor
   POST http://<IP>/inventory/update?vendor=vendor1
   Request Body 
   {
        "articles": [{
        "code": "AP3",
        "size": "XL",
        "quantity": 13,
        "price": 27
        },
        {
        "code": "AP1",
        "size": "L",
        "quantity": 8,
        "price": 28
        }]
    }

3) Check order fulfillment with lowest possible cost
   POST http://<IP>/inventory/checkOrderFullfillment
    Request Body 
    {
        "itenary": [
            {
                "code": "AP2",
                "quantity": 10,
                "size": "S"
            },
            {
                "code": "AP1",
                "quantity": 8,
                "size": "L"
            }
        ]
    }