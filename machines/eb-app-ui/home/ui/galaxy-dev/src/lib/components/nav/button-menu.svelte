<script lang="ts">
  function onclick(href: string, e: MouseEvent) {
    if (e.ctrlKey || e.metaKey) return;

    e.preventDefault();

    globalThis.location.href = href;
  }
</script>

<!-- -------------------------------------------------------------------------->
<button
  class="btn btn-outline-primary"
  type="button"
  data-bs-toggle="offcanvas"
  data-bs-target="#offcanvasMenu"
  aria-controls="offcanvasMenu"
  aria-label="Menu"
>
  <i class="bi bi-list"></i>
</button>

<div
  class="offcanvas offcanvas-end"
  id="offcanvasMenu"
  aria-labelledby="offcanvasMenuLabel"
>
  <div class="offcanvas-header bg-light">
    <h5 class="offcanvas-title text-muted" id="offcanvasMenuLabel">Menu</h5>

    <button
      type="button"
      class="btn-close text-reset"
      id="closeMenuButton"
      data-bs-dismiss="offcanvas"
      aria-label="Close"
    ></button>
  </div>

  <div class="offcanvas-body">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a
          class="nav-link"
          href="/pri/calendar"
          onclick={(e) => onclick("/pri/calendar", e)}
        >
          Calendar
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          href="/pri/meeting"
          onclick={(e) => onclick("/pri/meeting", e)}
        >
          Meetings
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          href="/pri/room"
          onclick={(e) => onclick("/pri/room", e)}
        >
          Meeting Rooms
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          href="/pri/domain"
          onclick={(e) => onclick("/pri/domain", e)}
        >
          Meeting Domains
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          href="/pri/profile"
          onclick={(e) => onclick("/pri/profile", e)}
        >
          Meeting Profiles
        </a>
      </li>

      <hr />

      <li class="nav-item">
        <a
          class="nav-link"
          href="/pri/contact"
          onclick={(e) => onclick("/pri/contact", e)}
        >
          Contacts
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          href="/pri/phone"
          onclick={(e) => onclick("/pri/phone", e)}
        >
          Public Phones
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          href="/pri/identity/key"
          onclick={(e) => onclick("/pri/identity/key", e)}
        >
          Private keys (for extension)
        </a>
      </li>
    </ul>
  </div>
</div>
