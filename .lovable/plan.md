

## DocJumpBar: Scroll-Linked Underline Progress

The underline should not snap between waypoints. Instead it should slide continuously, mirroring the user's exact vertical scroll progress through the document.

### Approach

1. **Track scroll progress through the waypoint range**: 
   - Find the first waypoint element's top and the last waypoint element's bottom (or a reasonable end anchor).
   - Compute `docProgress` = (currentScrollY - firstTop) / (lastBottom - firstTop), clamped 0–1.

2. **Map progress to underline position**:
   - The underline's `left` interpolates from the left edge of the first waypoint chip to the left edge of the last chip (or its right edge).
   - The underline's `width` can stay equal to the currently-overlapping chip's width, OR — cleaner — keep a fixed small width (e.g., 24px) that slides along the full chip row.
   - **Cleanest interpretation**: the underline spans from chip[0].left to chip[N-1].right when fully scrolled. So `width = docProgress * (lastRight - firstLeft)`, `left = firstLeft`. That gives a growing underline like a progress bar.
   - **Better match for "line slides word to word at scroll speed"**: keep underline width = current chip width, but its `left` interpolates linearly across the chip-row span proportional to scroll. Compute target `left = firstLeft + docProgress * (lastLeft - firstLeft)`. Width snaps to nearest chip's width (or interpolates between adjacent chips' widths).

3. **Implementation**:
   - In `PillContents`, add a scroll listener (rAF-throttled) that computes `docProgress` from waypoint DOM positions.
   - Measure each chip's `left` and `width` once (and on resize/layout changes).
   - For each frame, find which two adjacent waypoints the progress falls between (e.g., progress 0.37 with 4 waypoints → between idx 1 and 2 at local t=0.11), then `lerp` the underline's `left` and `width` between those two chips.
   - Remove the activeId-based snapping useEffect for the indicator (keep activeId for text color only, or drive activeId from the same progress calc).

4. **Remove transition CSS on left/width** (or shorten to ~80ms) so it follows scroll 1:1 instead of easing 350ms after each snap.

### Result

- Underline glides smoothly under the words at exactly the rate the user scrolls.
- No snapping; position mirrors document scroll position through the section range.
- Width morphs between adjacent chip widths so the line always feels anchored to "the word you're on".

