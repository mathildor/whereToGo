# whereToGo

## Run
$ bundle exec jekyll s

## Tutorial:
https://scotch.io/tutorials/getting-started-with-jekyll-plus-a-free-bootstrap-3-starter-theme


## Div
### Looping posts

Exemple of how to loop through all posts. In this project posts will be example a hostel, restaurant or site. 

```
{% for post in site.posts %}

    <h2>post.title</h2>
    <div class="content">
        {{ post.content }}
    </div>

{% endfor %}
```
