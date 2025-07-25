<nav class="nav-block">
  {items.map(item => (
    <div class="nav-item">
      <a href={item.link}>{item.title}</a>
      {item.children && (
        <div class="dropdown">
          {item.children.map(child => (
            <a href={child.link}>{child.title}</a>
          ))}
        </div>
      )}
    </div>
  ))}
</nav>