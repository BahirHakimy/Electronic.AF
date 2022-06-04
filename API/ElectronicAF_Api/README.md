# Api for the Electronic.AF website

### This API is built with [<img src="https://static.djangoproject.com/img/logos/django-logo-negative.svg" width="50" height="20" />](https://www.djangoproject.com/) and [Django Rest Framework](https://www.django-rest-framework.org/)

## Running the server localy

To run the project after cloning the project(or just pulling new changes from the repo) open `API/ElectronicAF_Api/` folder in vscode then open vscode integrated terminal and run the following command:

```bash

python -m venv venv

```

That will create a new folder `venv` in your project directory. and you will see the bellow prompt in vscode:

<img src="https://i.stack.imgur.com/HzSHk.png" width="600"/>

Select Yes, then close the current instance of vscode terminal and open a new vscode terminal instance and install the project dependencies with following command:

```bash

pip install -r requirements.txt

```

After installation completed run the following two commands to create database tables

```bash

python manage.py migrate
python manage.py migrate core

```

Now you can run the project with this command

```bash

python manage.py runserver

```

This will start the server at [127.0.0.1:8000/](http://127.0.0.1:8000/) address

<span style="color:orange">
Above commands was firsttime setup on future updates just pull new changes from repo and run following commands.
</span>
<hr>

```bash

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver

```

==================================

### Current ready to use endpoints

==================================

[api/auth/token/](#1-hostaddressportapiauthtoken)<br>
[api/auth/token/refresh](#2-hostaddressportapiauthtokenrefresh)<br>
[api/auth/register/](#3-hostaddressportapiauthregister)<br>
[api/auth/sendResetCode/](#4-hostaddressportapiauthsendresetcode)<br>
[api/auth/passwordReset/](#5-hostaddressportapiauthpasswordreset)<br>
[api/core/getProducts/](#1-hostaddressportapicoregetproducts)<br>
[api/core/createProduct/](#2-hostaddressportapicorecreateproduct)<br>
[api/core/updateProduct/](#3-hostaddressportapicoreupdateproduct)<br>
[api/core/deleteProduct/](#4-hostaddressportapicoredeleteproduct)<br>
[api/core/getCart/](#1-hostaddressportapicoregetcart)<br>
[api/core/addToCart/](#2-hostaddressportapicoreaddtocart)<br>
[api/core/removeFromCart/](#3-hostaddressportapicoreremovefromcart)<br>
[api/core/getUserReview/](#1-hostaddressportapicoregetuserreview)<br>
[api/core/getProductReviews/](#2-hostaddressportapicoregetproductreviews)<br>
[api/core/submitReview/](#3-hostaddressportapicoresubmitreview)<br>
[api/core/getRating/](#4-hostaddressportapicoregetrating)<br>

+++++++++++++++++++

#### Authentication

+++++++++++++++++++

### 1: `<<hostAddress:port>>/api/auth/token/`

- `Method` ![POST](https://img.shields.io/badge/POST-%23FF9900.svg)
- `IsProtected` : No
- `Expecting inputs`:

- ```json
  {
    "email": "useremail@example.com",
    "password": "atleast 6 charachter long password"
  }
  ```
- `Success Status`: `HTTP 200 OK`
- `Success Response`:
- ```json
  {
    "access": "a very very very long access token used to access protected endpoints",
    "refresh": "a very very very long token used to renew both tokens"
  }
  ```
- `Failiure Status`: `HTTP 401 Unauthorized`
- `Failiure Response`:
- ```json
  {
    "detail": "no active account found with the given credentials"
  }
  ```

### 2: `<<hostAddress:port>>/api/auth/token/refresh/`

- `Method` ![POST](https://img.shields.io/badge/POST-%23FF9900.svg)
- `IsProtected` : No
- `Expecting inputs`:

- ```json
  {
    "refresh": "current refresh token"
  }
  ```
- `Success Status`: `HTTP 200 OK`
- `Success Response`:
- ```json
  {
    "access": "a very very very long access token with renewed expiratino date",
    "refresh": "a very very very long token used to renew both tokens"
  }
  ```
- `Failiure Status`: `HTTP 401 Unauthorized`
- `Failiure Response`:
- ```json
  {
    "detail": "Token is invalid or expired",
    "code": "token_not_valid"
  }
  ```

### 3: `<<hostAddress:port>>/api/auth/register/`

- `Method` ![POST](https://img.shields.io/badge/POST-%23FF9900.svg)
- `IsProtected` : No
- `Expecting inputs`:

- ```json
  {
    "email": "new user email",
    "password": "at least 6 char long password",
    "phone": "9 digits long phone number eg:777888888",
    "firstname": "firstname of user",
    "lastname": "lastname of user"
  }
  ```
- `Success Status`: `HTTP 201 CREATED`
- `Success Response`:
- ```json
  {
    "email": "user saved email",
    "phone": "saved phone number",
    "firstname": "saved firstname",
    "lastname": "saved lastname"
  }
  ```
- `Failiure Status`: `HTTP 400 BadRequest`
- `Failiure Response`:
- ```json
  {
    "errors": {
      "email": "email error",
      "password": "password error",
      "phone": "phone error",
      "firstname": "firstname error",
      "lastname": "lastname error"
    }
  }
  ```

### 4: `<<hostAddress:port>>/api/auth/sendResetCode/`

- `Method` ![POST](https://img.shields.io/badge/POST-%23FF9900.svg)
- `IsProtected` : No
- `Expecting inputs`:

- ```json
  {
    "email": "email to send reset code to"
  }
  ```
- `Success Status`: `HTTP 200 OK`
- `Success Response`:
- ```json
  {
    "detail": "Reset code was sent to your email.If you can't find it check your spam folder."
  }
  ```
- `Failiure Status If email is not registered`: `HTTP 404 NotFound`
- `Failiure Response`:
- ```json
  {
    "detail": "User with the given email not found in the database."
  }
  ```
- `Failiure Status If email sending fail`: `HTTP 503 ServiceUnAvailable`
- `Failiure Response`:
- ```json
  {
    "detail": "Some thing went wrong please try again later."
  }
  ```

### 5: `<<hostAddress:port>>/api/auth/passwordReset/`

- `Method` ![POST](https://img.shields.io/badge/POST-%23FF9900.svg)
- `IsProtected` : No
- `Expecting inputs`:

- ```json
  {
    "email": "Email of user",
    "resetCode": "Reset code that was sent to user email",
    "newPassword": "New password for the user"
  }
  ```
- `Success Status`: `HTTP 202 Accepted`
- `Success Response`:
- ```json
  {
    "detail": "Password reseted successfully."
  }
  ```
- `Failiure Status If reset code is expired or used`: `HTTP 400 BadRequest`
- `Failiure Response`:
- ```json
  {
    "detail": "Entered resetCode is not valid or expired."
  }
  ```
- `Failiure Status If reset code is not registerd in database`: `HTTP 400 BadRequest`
- `Failiure Response`:
- ```json
  {
    "detail": "Entered resetCode is invalid."
  }
  ```

+++++++++++++++++++

#### CRUD Operation on products

+++++++++++++++++++

### 1: `<<hostAddress:port>>/api/core/getProducts/`

- `Method` ![GET](https://img.shields.io/badge/GET-00C300)
- `IsProtected` : No
- `Expecting inputs`: None
- `Success Status`: `HTTP 200 OK`
- `Success Response`:
- ```json
  [
    {
      "id": 37,
      "title": "Dell Xps 600 Gaming",
      "category": "Laptop",
      "cpu": "Intel core i7 10th genration 3.5GHz upto 5GHz",
      "gpu": "Nvidea Geforce Rtx 3080 8GB",
      "memory": "16GB",
      "storage": "256GB",
      "storageType": "SSD",
      "os": "Windows 10 Pro",
      "price": "1500.00",
      "description": "Gaming laptop",
      "images": [
        {
          "image": "image url",
          "thumbnail": "thumbnail url"
        }
      ]
    }
  ]
  ```
- `Failiure Status`: `HTTP 200 OK`
- `Failiure Response`:
- ```json
  { "detail": "No availble product in the database" }
  ```

### 2: `<<hostAddress:port>>/api/core/createProduct/`

- `Method` ![POST](https://img.shields.io/badge/POST-%23FF9900.svg)
- `IsProtected` : Yes `You should provide an admin user access token to access the endpoint`
- `Accepting Data Type`:"multipart/form-data"
- `Expecting inputs`:
- ```json
  {
    "title": "product title",
    "category": "LT for[Laptop] and DT for[Desktop]",
    "cpu": "cpu info",
    "gpu": "gpu info",
    "memory": "must be [4|8|16|32|64|128]",
    "storage": "must be [256|512|1000|2000|4000]",
    "storageType": "[1 for[HDD] 2 for[SSD]]",
    "os": "operating system info [Optional]",
    "price": "must be between range [0-9999].[00]",
    "description": "product description [Optional]",
    "image1": "a valid uploaded image ",
    "image2": "a valid uploaded image, you can add up to three images"
  }
  ```

- `Success Status`: `HTTP 201 Created`
- `Success Response`:
- ```json
  {
    "id": "auto generated id",
    "title": "created product title",
    "category": "selected category",
    "cpu": "...",
    "gpu": "...",
    "memory": "...",
    "storage": "...",
    "storageType": "...",
    "os": "...",
    "price": "...",
    "description": "...",
    "images": [
      {
        "image": "image url",
        "thumbnail": "thumbnail url"
      },
      {
        "image": "image url",
        "thumbnail": "thumbnail url"
      }
    ]
  }
  ```

- `Failiure Status`: `HTTP 400 BadRequest`
- `Failiure Response`:
- ```json
  {
    "errors": {
      "title": "error associated with title field",
      "..."
    }
  }
  ```
- `Failiure Status if sent images are more than 25MB or invalid type`: `HTTP 400 BadRequest`
- `Failiure Response`:
- ```json
  {
    "detail": "Error: The sent files are either too big or not supported"
  }
  ```

### 3: `<<hostAddress:port>>/api/core/updateProduct/`

- `Method` ![PUT](https://img.shields.io/badge/PUT-%23039BE5.svg)
- `IsProtected` : Yes `You should provide an admin user access token to access the endpoint`
- `Expecting inputs`:
- ```json
  {
    "id":"product id you want to update [Required]",
    "title": "new title",
    "... include any field you want to update"
  }
  ```

- `Success Status`: `HTTP 202 Accepted`
- `Success Response`:
- ```json
  {
    "id": "product id",
    "title": "updated title",
    "..."
  }
  ```

- `Failiure Status`: `HTTP 400 BadRequest`
- `Failiure Response`:
- ```json
  {
    "errors": {
      "title": "error associated with title field",
      "..."
    }
  }
  ```
- `Failiure Status if id is not included in request body`: `HTTP 400 BadRequest`
- `Failiure Response`:
- ```json
  {
    "detail": "You must include the id of product you want to update"
  }
  ```
- `Failiure Status if product doesn't exists in database`: `HTTP 404 NotFound`
- `Failiure Response`:
- ```json
  {
    "detail": "Product with the given id was not found in the system"
  }
  ```

### 4: `<<hostAddress:port>>/api/core/deleteProduct/`

- `Method` ![DELETE](https://img.shields.io/badge/DELETE-%23FF0000)
- `IsProtected` : Yes `You should provide an admin user access token to access the endpoint`
- `Expecting inputs`:
- ```json
  {
    "id": "product id you want to delete [Required]"
  }
  ```

- `Success Status`: `HTTP 200 OK`
- `Success Response`:
- ```json
  {
    "detail": "Product with id {id} was deleted successfully"
  }
  ```

- `Failiure Status if id is not included in request body`: `HTTP 400 BadRequest`
- `Failiure Response`:
- ```json
  {
    "detail": "You must include the id of product you want to delete"
  }
  ```
- `Failiure Status if product doesn't exists in database`: `HTTP 404 NotFound`
- `Failiure Response`:
- ```json
  {
    "detail": "Product with the given id was not found in the system"
  }
  ```

++++++++++++++++++++

#### Cart Operations

++++++++++++++++++++

### 1: `<<hostAddress:port>>/api/core/getCart/`

- `Method` ![POST](https://img.shields.io/badge/POST-%23FF9900.svg)
- `IsProtected` : Yes
- `Accepting Data Type`:"application/json"
- `Expecting inputs`:
- ```json
  {
    "email": "user's email to get cart info"
  }
  ```

- `Success Status`: `HTTP 200 OK`
- `Success Response`:
- ```json
  {
    "id": 1,
    "items": [
      {
        "product": {
          "id": 37,
          "title": "Dell Xps 600 Gaming",
          "category": "Laptop",
          "cpu": "Intel core i7 10th genration 3.5GHz upto 5GHz",
          "gpu": "Nvidea Geforce Rtx 3080 8GB",
          "memory": "16GB",
          "storage": "256GB",
          "storageType": "SSD",
          "os": "Windows 10 Pro",
          "price": "1500.00",
          "description": "",
          "images": [
            {
              "image": "/media/products/20220331_152635.jpg",
              "thumbnail": "/media/products/tumbnails/20220331_152635_thumbnail.jpg"
            }
          ]
        },
        "quantity": 2
      }
    ]
  }
  ```

- `Failiure Status`: `HTTP 400 BadRequest`
- `Failiure Response`:
- ```json
  {
    "detail": "You should provide user's email to get cart status."
  }
  ```
- `Failiure Status If email is not registered in database`: `HTTP 404 NotFound`
- `Failiure Response`:
- ```json
  {
    "detail": "User with the given email does not exist."
  }
  ```

### 2: `<<hostAddress:port>>/api/core/addToCart/`

- `Method` ![POST](https://img.shields.io/badge/POST-%23FF9900.svg)
- `IsProtected` : Yes
- `Accepting Data Type`:"application/json"
- `Expecting inputs`:
- ```json
  {
    "email": "user's email",
    "productId": "productId to add to cart"
  }
  ```

- `Success Status`: `HTTP 202 Accepted`
- `Success Response`:
- ```json
  {
    "detail": "Product added to cart.",
    "items": [
      {
        "product": {
          "id": 37,
          "title": "Dell Xps 600 Gaming",
          "...":"Rest of product properties",
          "images": [
            {
              "image": "product image url",
              "thumbnail": "product thumbnail url"
            },
          ]
        },
        "quantity": 1
      }
      {
        "product": {
          "id": 38,
          "title": "Dell AlienWare Area51m Gaming",
          "...":"Rest of product properties",
          "images": [
            {
              "image": "product image url",
              "thumbnail": "product thumbnail url"
            },
          ]
        },
        "quantity": 2
      }
    ]
  }
  ```

- `Failiure Status`: `HTTP 400 BadRequest`
- `Failiure Response`:
- ```json
  {
    "detail": "You should include user's email and productId in your request."
  }
  ```
- `Failiure Status If email is not registered in database`: `HTTP 404 NotFound`
- `Failiure Response`:
- ```json
  {
    "detail": "User with the given email does not exist."
  }
  ```
- `Failiure Status If product id is not valid`: `HTTP 404 NotFound`
- `Failiure Response`:
- ```json
  {
    "detail": "Requested product does not exist."
  }
  ```

### 3: `<<hostAddress:port>>/api/core/removeFromCart/`

- `Method` ![POST](https://img.shields.io/badge/POST-%23FF9900.svg)
- `IsProtected` : Yes
- `Accepting Data Type`:"application/json"
- `Expecting inputs`:
- ```json
  {
    "cartId": "user's cart id",
    "productId": "productId to remove from cart",
    "removeProduct": "[true|false] Wheather to remove product from cart of just decrease its quantity.  [OPTIONAL]"
  }
  ```

- `Success Status`: `HTTP 202 Accepted`
- `Success Response [Returns updated cart info]`:
- ```json
  {
    "detail": "[if removeProduct was true or quantity is 1] 'Product was removed from your cart.' [if removeProduct was false] 'Product quantity updated'",
    "items": [
      {
        "product": {
          "id": 1,
          "title": "Hp Omen gaming",
          "...": "Rest of product props"
        },
        "quantity": 1
      },
      {
        "product": {
          "id": 37,
          "title": "Dell Xps 600 Gaming",
          "...": "Rest of product props"
        },
        "quantity": 2
      }
    ]
  }
  ```

- `Failiure Status`: `HTTP 400 BadRequest`
- `Failiure Response`:
- ```json
  {
    "detail": "You should include cartId, productId and removedProduct in your request."
  }
  ```

- `Failiure Status If cartId is not valid`: `HTTP 400 BadRequest`
- `Failiure Response`:
- ```json
  {
    "detail": "Provided cartId is not valid"
  }
  ```
- `Failiure Status If product id is not valid`: `HTTP 404 NotFound`
- `Failiure Response`:
- ```json
  {
    "detail": "Requested product does not exist."
  }
  ```

++++++++++++++++++

Review and Rating

++++++++++++++++++

### 1: `<<hostAddress:port>>/api/core/getUserReview/`

- `Method` ![POST](https://img.shields.io/badge/POST-%23FF9900.svg)
- `IsProtected` : Yes
- `Accepting Data Type`:"application/json"
- `Expecting inputs`:
- ```json
  {
    "email": "user's email",
    "productId": "Id of product that review is submited on"
  }
  ```

- `Success Status`: `HTTP 200 OK`
- `Success Response`:
- ```json
  {
    "product": 38,
    "rating": 4,
    "review": "I like this laptop"
  }
  ```

- `Status If no rating is associated with the given product id`: `HTTP 200 OK`
- `Response`:
- ```json
  {}
  ```

- `Failiure Status If email is not valid`: `HTTP 404 NotFound`
- `Failiure Response`:
- ```json
  {
    "detail": "User with the given email does not exist."
  }
  ```

### 2: `<<hostAddress:port>>/api/core/getProductReviews/`

- `Method` ![POST](https://img.shields.io/badge/POST-%23FF9900.svg)
- `IsProtected` : No
- `Accepting Data Type`:"application/json"
- `Expecting inputs`:
- ```json
  {
    "productId": "Id of product to get all reviews for."
  }
  ```

- `Success Status`: `HTTP 200 OK`
- `Success Response`:
- ```json
  [
    {
      "username": "ajmal hakimy",
      "product": 38,
      "rating": 4,
      "review": "I like this laptop"
    },
    {
      "username": "ahmadAhmadi",
      "product": 38,
      "rating": 3,
      "review": "Good PC"
    }
  ]
  ```

- `Status If no review is associated with the given product id`: `HTTP 200 OK`
- `Response`:
- ```json
  {}
  ```
- `Failiure Status `: `HTTP 400 BadRequest`
- `Failiure Response`:
- ```json
  {
    "detail": "You should include productId in your request."
  }
  ```

### 3: `<<hostAddress:port>>/api/core/submitReview/`

- `Method` ![POST](https://img.shields.io/badge/POST-%23FF9900.svg)
- `IsProtected` : Yes
- `Accepting Data Type`:"application/json"
- `Expecting inputs`:
- ```json
  {
    "productId": "Id of product to submit review to",
    "email": "user's email",
    "rating": "rate score valid choices are [1,2,3,4,5]",
    "review": "A message or review description  [OPTIONAL]"
  }
  ```

- `Success Status`: `HTTP 202 Accepted`
- `Success Response [Returns saved review]`:
- ```json
  {
    "detail": "[If review already existed] 'Review Updated.'[If review is new] 'Review Submited'",
    "data": {
      "product": 1,
      "rating": "saved rating",
      "review": "saved message"
    }
  }
  ```

- `Failiure Status`: `HTTP 400 BadRequest`
- `Failiure Response`:
- ```json
  {
    "detail": "You should include productId and user email in your request."
  }
  ```

- `Failiure Status If rating is not valid`: `HTTP 400 BadRequest`
- `Failiure Response`:
- ```json
  {
    "errors": {
      "rating": "rating error"
    }
  }
  ```

- `Failiure Status rating is not included in request`: `HTTP 400 BadRequest`
- `Failiure Response`:
- ```json
  {
    "errors": {
      "rating": "This field is required."
    }
  }
  ```
- `Failiure Status If email is not valid`: `HTTP 404 NotFound`
- `Failiure Response`:
- ```json
  {
    "detail": "User with the given email does not exist."
  }
  ```

### 4: `<<hostAddress:port>>/api/core/getRating/`

- `Method` ![POST](https://img.shields.io/badge/POST-%23FF9900.svg)
- `IsProtected` : No
- `Accepting Data Type`:"application/json"
- `Expecting inputs`:
- ```json
  {
    "productId": "Id of product to submit review to"
  }
  ```

- `Success Status`: `HTTP 200 OK`
- `Success Response`:
- ```json
  {
    "average_rating": "Average rating derived from dividing (total ratings/total reviews)",
    "reviews": "Number of reviewers"
  }
  ```

- `Failiure Status`: `HTTP 400 BadRequest`
- `Failiure Response`:
- ```json
  {
    "detail": "You should include productId to get average review for."
  }
  ```

- `Failiure Status If product id is not valid`: `HTTP 404 NotFound`
- `Failiure Response`:
- ```json
  {
    "detail": "Product with the given id was not found."
  }
  ```
