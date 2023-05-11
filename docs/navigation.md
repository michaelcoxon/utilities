
{% assign navigation_files = site.pages %}

<ul>
{% for file in navigation_files %}
  <li><a href="{{ file.url }}">asdf{{ file.title }}</a></li>
{% endfor %}
</ul>