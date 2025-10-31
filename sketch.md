## 💎 Design Spec: Zen & Sharing Website

### I. Overview & Style Guide

* **Main color tone:** Minimalist, elegant. Use natural colors: Wood brown, Copper gold (or Cream gold), Moss green, Ivory white.
* **Font:**
* **Headings:** Use **Serif font** to create a solemn, classic feel (Example: Playfair Display, Merriweather).
* **Body Text:** Use **Sans-serif font** for easy reading (Example: Inter, Noto Sans).

### II. Global Structure & Navigation

* **Navbar:**
* Position: Fixed at the top (Header).
* Logo: Use the "FCAJ Team" logo. When clicked, always navigate to Page 1 (Motivation Corner).
* Menu: Displays main links: Motivation Corner, Wisdom Corner, Charity Corner, Temple Guide.
* **Music Player:**
* Location: Integrated in Navbar.
* Function: Allows sliding down to select 1 of 3 types of music (Buddhist chanting, Great Bright Six-character mantra, Instrumental meditation music). Has a Pause button.
* Behavior: Music **plays continuously** when users switch between pages.
* **Footer:**
* Design: Minimalist.
* Content: Contains only copyright information.

### III. Page-by-Page Design

#### Page 1: Motivation Corner (Wish Wall) - (Home Page)

* **Look:** The background is a blurred image of a quiet space (e.g., bamboo forest, temple yard).
* **Action:** In the middle is a large, elegant button: "Send Wishes to the Universe".
* **Display:**
* When the button is pressed, a modal (pop-up) appears for the user to type text.
* **Logic:** Limit the content to **500 words**.
* **Logic:** This is an internal channel, 100% trustworthy. Wishes will be **displayed immediately** after being sent (no moderation).
* **Display:**
* Below the button is an area that displays the "wish cards" that people have sent.
* The latest card appears on top with a "fade in" effect.

* **Responsive (Mobile):** The grid of wish cards will be **arranged vertically (1 column)**.

* **Empty State:** When no one has sent a wish, the grid area will be **empty**.

#### Page 2: Wisdom Corner (Gieo Duyen)

* **Look:** Super minimalist. Plain background (cream color). In the middle is only an image of a "tattoo box" or a lotus flower branch.

* **Action:** "Thinh Mot Loi Hay" button.

* **Display:**
* When clicked, a simple card drawing/divination animation occurs.

* Immediately, a "card" pops out, displaying a randomly selected quote. The font is large, clear, and formal.

* **Logic:** Quotes **must show the source/author** (e.g., "Dhammapada", "Zen Master Thich Nhat Hanh") to increase credibility. (Data collected by the team).

* There is a "Copy advice" button.

#### Page 3: Charity Corner (CSR)

* **Look:** Serious, formal, and clear. This page does not need flowers.

* **Display (Desktop):**
* Divided into 2 clear columns.

* Left column: QR Code of the Vietnam Fatherland Front Committee (large, clear).

* Right column: Commitment text ("FCJ Team does not keep money...") and (if any) a manual summary number.

* **Responsive (Mobile):** 2 columns automatically stacked: **QR Code displayed above, Text displayed below**.

#### Page 4: Chùa Handbook (Blog)

* **Look:** Like a magazine style page.
* **Display (Main Page):**
* "Featured" (Pin) post at the top with a large image.
* Below is a list of the latest posts.
* **Layout:** All posts (including on desktop) will be **arranged vertically (1 column)**.
* **Display (Detail Page):**
* Large cover image at the top of the post.
* Title and author name (team member).
* Post content with easy-to-read font, alternating images.
* **Action:**
* No comment feature needed.
* Just the "Share" button. When clicked, the action is **"Copy link"** to the clipboard.
* **Empty State:** If the Blog has no posts yet, this area will be **empty**.

#### Page 5: Error Page (404 Not Found)

* **Look:** Thematic design.

* **Display:** Image of a bamboo forest trail.

* **Text:** Displays the text: "It seems you've... lost your way. Please return to the home page to find some peace."

* **Action:** A "Back to Home" button (link to Page 1).

### IV. Micro-interactions & States

* **Hover State:**
* **Button:** When hovering over the main buttons ("Send Wishes", "Request Good Words"), the button will **change color** (may have a color-changing effect over time).

* **Cards:** When hovering over a "wish card" (Page 1) or a blog post (Page 4), the card will have a **lift-up effect**.

* **Loading Status:**
* Use "Lazy Loading" technique for images (especially on Page 4) to optimize