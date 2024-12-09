 // Перенос даты поста вниз

    if (!options.optionDate)
        KPP.add('.post', function (post) {
            var pd = post.getElementsByClassName('post_date')[0];
            var wt = post.getElementsByClassName('wall_text')[0];
            var pfl = post.getElementsByClassName('post_full_like')[0];
            var lw = post.getElementsByClassName('like_wrap')[0];
            if (pd && pfl) {
                pfl.insertBefore(pd, pfl.firstElementChild);
                pd.style.outline = '1px #F55 dashed';
            } else if (pd && wt) {
                if (lw)
                    lw.insertBefore(pd, lw.firstChild);
                else
                    wt.parentElement.appendChild(pd)
            }
        });
		