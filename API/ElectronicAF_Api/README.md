# Api for the Electronic.AF website

### This API is built with [<img src="https://static.djangoproject.com/img/logos/django-logo-negative.svg" width="50" height="20" />](https://www.djangoproject.com/) and [Django Rest Framework](https://www.django-rest-framework.org/)

## Running the server localy

To run the project after cloning the project(or just pulling new changes from the repo) open `API/ElectronicAF_Api/` folder in vscode then open vscode integrated terminal and run the following command:

```

python -m venv venv

```

That will create a new folder `venv` in your project directory. and you will see the bellow prompt in vscode:

<img src="https://i.stack.imgur.com/HzSHk.png" width="600"/>

Select Yes, then close the current instance of vscode terminal and open a new vscode terminal instance and install the project dependencies with following command:

```

pip install -r requirements.txt

```

After installation completed run the following two commands to create database tables

```

python manage.py migrate
python manage.py migrate core

```

Now you can run the project with this command

```

python manage.py runserver

```

This will start the server at [127.0.0.1:8000/](http://127.0.0.1:8000/) address

<span style="color:orange">
Above commands was firsttime setup on future updates just pull new changes from repo and run following commands.
</span>

```

pip install -r requirements.txt
python manage.py migrate
python manage.py migrate core
python manage.py runserver

```

==================================

### Current ready to use endpoints

==================================

+++++++++++++++++++

#### Authentication

+++++++++++++++++++

1:- `<<hostAddress:port>>/api/auth/token/`

- `Method`: Post
- `IsProtected` : NO
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

2:- `<<hostAddress:port>>/api/auth/token/refresh/`

- `Method`: Post
- `IsProtected` : NO
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

3:- `<<hostAddress:port>>/api/auth/register/`

- `Method`: Post
- `IsProtected` : NO
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

  4:- `<<hostAddress:port>>/api/auth/sendResetCode/`

- `Method`: Post
- `IsProtected` : NO
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
    "detail":"Some thing went wrong please try again later.
  }
  ```

4:- `<<hostAddress:port>>/api/auth/passwordReset/`

- `Method`: Post
- `IsProtected` : NO
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
    "detail":"Entered resetCode is invalid.
  }
  ```


+++++++++++++++++++

#### CRUD Operation on products

+++++++++++++++++++

1:- `<<hostAddress:port>>/api/core/getProducts/`

- `Method`: Get
- `IsProtected` : NO
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

2:- `<<hostAddress:port>>/api/core/createProduct/`

- `Method`: Post
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
- `Failiure Status sent images are more than 25MB or invalid type`: `HTTP 400 BadRequest`
- `Failiure Response`:
- ```json
  {
    "detail": "Error: The sent files are either too big or not supported"
  }
  ```

3:- `<<hostAddress:port>>/api/core/updateProduct/`

- `Method`: Put
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

3:- `<<hostAddress:port>>/api/core/updateProduct/`

- `Method`: Delete
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
